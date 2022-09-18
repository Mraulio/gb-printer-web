import dayjs from 'dayjs';
import Queue from 'promise-queue/lib';
import getUploadImages from '../../../../tools/getUploadImages';
import saveLocalStorageItems, { saveImageFileContent } from '../../../../tools/saveLocalStorageItems';
import DropboxClient from '../../../../tools/DropboxClient';
import createDropboxContentHasher from '../../../../tools/DropboxClient/createDropboxContentHasher';
import parseAuthParams from '../../../../tools/parseAuthParams';
import { getPrepareFiles } from '../../../../tools/download';
import getImagePalette from '../../../../tools/getImagePalette';
import loadImageTiles from '../../../../tools/loadImageTiles';
import replaceDuplicateFilenames from '../../../../tools/replaceDuplicateFilenames';
import getFilteredImages from '../../../../tools/getFilteredImages';
import dateFormatLocale from '../../../../tools/dateFormatLocale';

import {
  CONFIRM_ANSWERED,
  CONFIRM_ASK,
  DROPBOX_LOG_ACTION,
  DROPBOX_SETTINGS_IMPORT,
  DROPBOX_START_AUTH,
  ERROR,
  LAST_UPDATE_DROPBOX_REMOTE,
  SET_DROPBOX_STORAGE,
  STORAGE_DIFF_DONE,
  STORAGE_SYNC_DONE,
  STORAGE_SYNC_START,
  TRY_RECOVER_IMAGE_DATA,
  UPDATE_IMAGES_BATCH,
} from '../../actions';

let dropboxClient;
let addToQueue = () => {};

const middleware = (store) => {

  const queue = new Queue(1, Infinity);
  addToQueue = (who) => (what, throttle, fn, isSilent) => (
    queue.add(() => (
      new Promise((resolve, reject) => {
        window.setTimeout(() => {
          if (!isSilent) {
            store.dispatch({
              type: DROPBOX_LOG_ACTION,
              payload: {
                timestamp: (new Date()).getTime() / 1000,
                message: `${who} runs ${what}`,
              },
            });
          }

          fn()
            .then(resolve)
            .catch(reject);
        }, throttle);
      })
    ))
  );

  const checkDropboxStatus = () => {
    store.dispatch({
      type: STORAGE_SYNC_START,
      payload: {
        storageType: 'dropbox',
        direction: 'diff',
      },
    });
  };

  dropboxClient = new DropboxClient(store.getState().dropboxStorage, addToQueue('Dropbox'));

  if (store.getState().dropboxStorage.autoDropboxSync) {
    // check dropbox for updates
    checkDropboxStatus();

    // check dropbox for updates
    dropboxClient.on('settingsChanged', () => {
      checkDropboxStatus();
    });
  }

  dropboxClient.on('loginDataUpdate', (data) => {
    store.dispatch({
      type: SET_DROPBOX_STORAGE,
      payload: {
        ...store.getState().dropboxStorage,
        ...data,
      },
    });
  });

  const { dropboxCode } = parseAuthParams();
  if (dropboxCode) {
    dropboxClient.codeAuth(dropboxCode);
  }

  return (action) => {
    const state = store.getState();

    if (action.type === SET_DROPBOX_STORAGE) {
      dropboxClient.setRootPath(state.dropboxStorage.path || '/');
    }

    if (action.type === STORAGE_SYNC_START) {

      if (action.payload.storageType === 'dropbox') {

        dropboxClient.getRemoteContents(action.payload.direction)
          .then((repoContents) => {
            switch (action.payload.direction) {
              case 'diff': {

                if (repoContents?.settings?.state?.lastUpdateUTC === null) {
                  return Promise.resolve(null);
                }

                store.dispatch({
                  type: LAST_UPDATE_DROPBOX_REMOTE,
                  payload: repoContents.settings.state.lastUpdateUTC,
                });

                if (repoContents.settings.state.lastUpdateUTC > state?.syncLastUpdate?.local) {

                  store.dispatch({
                    type: CONFIRM_ASK,
                    payload: {
                      message: 'There is newer content in your dropbox!',
                      questions: () => [
                        `Your dropbox contains changes from ${dateFormatLocale(dayjs(repoContents.settings.state.lastUpdateUTC * 1000), state.preferredLocale)}`,
                        `Your last local update was ${state?.syncLastUpdate?.local ? (dateFormatLocale(dayjs(state.syncLastUpdate.local * 1000), state.preferredLocale)) : 'never'}.`,
                        'Do you want to load the changes?',
                      ]
                        .map((label, index) => ({
                          label,
                          key: `info${index}`,
                          type: 'info',
                        })),
                      confirm: () => {
                        store.dispatch({
                          type: CONFIRM_ANSWERED,
                        });
                        store.dispatch({
                          type: STORAGE_SYNC_START,
                          payload: {
                            storageType: 'dropbox',
                            direction: 'down',
                          },
                        });
                      },
                      deny: () => {
                        store.dispatch({
                          type: CONFIRM_ANSWERED,
                        });
                      },
                    },
                  });
                }

                return Promise.resolve(null);
              }

              case 'up': {
                const lastUpdateUTC = state?.syncLastUpdate?.local || Math.floor((new Date()).getTime() / 1000);
                return getUploadImages(store, repoContents, lastUpdateUTC, addToQueue('GBPrinter'))
                  .then((changes) => dropboxClient.upload(changes, 'settings'))
                  .then((result) => {
                    store.dispatch({
                      type: LAST_UPDATE_DROPBOX_REMOTE,
                      payload: lastUpdateUTC,
                    });

                    return result;
                  });
              }

              case 'down': {
                return saveLocalStorageItems(repoContents)
                  .then((result) => {
                    store.dispatch({
                      type: DROPBOX_SETTINGS_IMPORT,
                      payload: repoContents.settings,
                    });

                    return result;
                  });
              }

              default:
                return Promise.reject(new Error('dropbox sync: wrong sync case'));
            }
          })
          .then((syncResult) => {
            store.dispatch({
              type: action.payload.direction === 'diff' ? STORAGE_DIFF_DONE : STORAGE_SYNC_DONE,
              payload: {
                syncResult,
                storageType: 'dropbox',
              },
            });
          })
          .catch((error) => {
            console.error(error);
            store.dispatch({
              type: ERROR,
              payload: error.message,
            });
          });

      }

      if (action.payload.storageType === 'dropboximages') {

        const images = getFilteredImages(state);
        const prepareFiles = getPrepareFiles(state);
        const loadTiles = loadImageTiles(state);

        Promise.all(images/* .slice(0, 5) */.map((image, index) => (
          addToQueue('Generate images and hashes')(`${index + 1}/${images.length}`, 10, () => {
            const imagePalette = getImagePalette(state, image);
            return loadTiles(image)
              .then(prepareFiles(imagePalette, image))
              .then((imageBlobs) => Promise.all(imageBlobs.map((imageB) => {
                const hasher = createDropboxContentHasher();
                return imageB.blob.arrayBuffer()
                  .then((arrayBuffer) => {
                    hasher.update(arrayBuffer);
                    return ({
                      ...imageB,
                      dropboxContentHash: hasher.digest('hex'),
                    });
                  });
              })));
          })
        )))
          .then((resultImages) => resultImages.flat())
          .then(replaceDuplicateFilenames)
          .then((hashedImages) => (
            dropboxClient.getImageContents()
              .then((imageContents) => {
                switch (action.payload.direction) {
                  case 'up': {
                    const missingImages = hashedImages
                      .filter(({ dropboxContentHash, uFilename }) => {

                        // check for remote image with same hash AND filename
                        const exactImage = imageContents.find(({ content_hash: contentHash, name: filename }) => (
                          (contentHash === dropboxContentHash) &&
                          (filename === uFilename)
                        ));

                        // exact image not found -> has to remain in "missingImages"
                        return !exactImage;
                      })
                      .map((image) => ({
                        ...image,
                        destination: image.uFilename,
                      }));

                    return dropboxClient.upload({ upload: missingImages, del: [] }, 'images');
                  }

                  default:
                    return Promise.reject(new Error('dropbox sync: wrong sync case'));
                }
              })
          ))

          .then((syncResult) => {
            store.dispatch({
              type: STORAGE_SYNC_DONE,
              payload: {
                syncResult,
                storageType: 'dropbox',
              },
            });
          })
          .catch((error) => {
            console.error(error);
            store.dispatch({
              type: ERROR,
              payload: error.message,
            });
          });

      }

    }

    if (action.type === DROPBOX_START_AUTH) {
      dropboxClient.startAuth();
    }

    if (action.type === TRY_RECOVER_IMAGE_DATA) {
      dropboxClient.getFileContent(`images/${action.payload}.txt`, 0, 1, true)
        .then(saveImageFileContent)
        .then(() => {
          // This forces an update of the complete images array
          store.dispatch({
            type: UPDATE_IMAGES_BATCH,
            payload: [],
          });
        });
    }

  };
};

export default middleware;
