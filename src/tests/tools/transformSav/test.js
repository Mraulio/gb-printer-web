import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getTransformSav from '../../../javascript/tools/transformSav';
// import mockSav from '../../mockdata/frames.sav';

const mockSav = Array(1024 * 128).fill(255);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getTransformSav', () => {
  it('dispatches CONFIRM_ASK', () => {
    const store = mockStore({
      // images: [],
      savFrameTypes: 'int',
      frames: [
        { id: 'int01', name: 'int' },
        { id: 'jp02', name: 'jp' },
      ],
    });

    let questionOptions;

    new Promise((resolve) => {
      getTransformSav(store)(mockSav, 'frames.sav');
      questionOptions = store.getActions()[0].payload.questions()[0].options;
      store.getActions()[0].payload.deny();
      store.getActions()[0].payload.confirm({ selectedFrameset: 'int' });

      window.setTimeout(() => {
        resolve();
      }, 200);
    })
      .then(() => {
        expect(store.getActions()[0].type).toBe('CONFIRM_ASK');
        expect(store.getActions()[1].type).toBe('CONFIRM_ANSWERED');
        expect(store.getActions()[2].type).toBe('CONFIRM_ANSWERED');

        expect(questionOptions).toStrictEqual([
          {
            value: 'int',
            name: 'International Frames (GameBoy Camera)',
            selected: true,
          },
          {
            value: 'jp',
            name: 'Japanese Frames (Pocket Camera)',
            selected: false,
          },
        ]);

        expect(store.getActions()[3].type).toBe('ADD_TO_QUEUE');
      });

  });

  it('dispatches ADD_TO_QUEUE', () => {
    const store = mockStore({
      // images: [],
      savFrameTypes: 'int',
      frames: [],
    });

    new Promise((resolve) => {
      getTransformSav(store)(mockSav, 'frames.sav');

      window.setTimeout(() => {
        resolve();
      }, 200);
    })
      .then(() => {
        expect(store.getActions()[0].type).toBe('ADD_TO_QUEUE');
      });
  });

});
