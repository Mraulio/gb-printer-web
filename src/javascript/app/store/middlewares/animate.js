import gifshot from 'gifshot';
import { saveAs } from 'file-saver';
import loadImageTiles from '../../../tools/loadImageTiles';
import getImagePalette from '../../../tools/getImagePalette';
import RGBNDecoder from '../../../tools/RGBNDecoder';
import Decoder from '../../../tools/Decoder';
import generateFileName from '../../../tools/generateFileName';

const animate = (store) => (next) => (action) => {

  if (action.type === 'ANIMATE_IMAGES') {
    const state = store.getState();
    const {
      scaleFactor,
      frameRate,
      imageSelection,
      yoyo,
      frame: videoFrame,
      lockFrame: videoLockFrame,
      invertPalette: videoInvertPalette,
      palette: videoPalette,
      cropFrame,
    } = state.videoParams;

    Promise.all(imageSelection.map((imageHash) => (
      state.images.find(({ hash }) => hash === imageHash)
    ))
      .filter(Boolean)
      .map((image) => (
        {
          ...image,
          frame: videoFrame || image.frame,
          palette: image.hashes ? image.palette : (videoPalette || image.palette),
        }
      ))
      .map((image) => (
        loadImageTiles(image, state)
          .then((tiles) => {
            const palette = getImagePalette(state, image);

            const isRGBN = !!image.hashes;
            const decoder = isRGBN ? new RGBNDecoder() : new Decoder();
            const lockFrame = videoLockFrame || image.lockFrame || false;
            const invertPalette = videoInvertPalette || image.invertPalette || false;

            if (isRGBN) {
              decoder.update({
                tiles: RGBNDecoder.rgbnTiles(tiles),
                palette,
                lockFrame,
              });
            } else {
              decoder.update({
                tiles,
                palette: palette.palette,
                lockFrame,
                invertPalette,
              });
            }

            return decoder.getScaledCanvas(scaleFactor, cropFrame);
          })
      )))
      .then((images) => {
        const ctxs = [];
        images.forEach((canvas) => {
          ctxs.push(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height));
        });

        if (yoyo) {
          const reverseImages = [...images].reverse();

          // remove first and last image, as they would
          // appear dupliicated in the animation
          reverseImages.shift();
          reverseImages.pop();

          reverseImages.forEach((canvas) => {
            ctxs.push(canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height));
          });
        }

        const gifFileName = generateFileName({
          useCurrentDate: true,
          exportScaleFactor: scaleFactor,
          frameRate,
          altTitle: 'animated',
          frameName: videoFrame,
          paletteShort: videoPalette,
        });

        gifshot.createGIF({
          gifWidth: images[0].width,
          gifHeight: images[0].height,
          frameDuration: 10 / frameRate,
          progressCallback: (progress) => {
            store.dispatch({
              type: 'CREATE_GIF_PROGRESS',
              payload: progress,
            });
          },
          savedRenderingContexts: ctxs,
        }, (result) => {
          fetch(result.image)
            .then((res) => res.blob())
            .then((blob) => {
              saveAs(blob, `${gifFileName}.gif`);
              store.dispatch({
                type: 'CREATE_GIF_PROGRESS',
                payload: 0,
              });
            });
        });
      });
  }

  next(action);
};

export default animate;
