import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getTransformSav from '../../../javascript/tools/transformSav';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const framesIntResult = require('./frames_int.json');
const mockSav = global.mockBinaries['frames.sav'];

describe('getTransformSav', () => {

  it('to ask for frames before resolving with images', () => {
    const store = mockStore({
      // images: [],
      savFrameTypes: 'int',
      frames: [
        { id: 'int01', name: 'int' },
        { id: 'jp02', name: 'jp' },
      ],
    });

    // start import
    const call = getTransformSav(store)(mockSav, 'frames.sav');

    const questionOptions = store.getActions()[0].payload.questions()[0].options;

    expect(questionOptions.length).toBe(2);

    expect(typeof store.getActions()[0].payload.deny).toBe('function');

    expect(store.getActions()[0].type).toBe('CONFIRM_ASK');
    expect(store.getActions()[1]).toBeFalsy();

    // "click" the confirm button
    store.getActions()[0].payload.confirm({ selectedFrameset: 'int' });

    expect(store.getActions()[1].type).toBe('CONFIRM_ANSWERED');

    return call.then((images) => {
      expect(images).toStrictEqual(framesIntResult);
    });
  });

  it('to resolve without images if cancelled', () => {
    const store = mockStore({
      // images: [],
      savFrameTypes: 'int',
      frames: [
        { id: 'int01', name: 'int' },
        { id: 'jp02', name: 'jp' },
      ],
    });

    // start import
    const call = getTransformSav(store)(mockSav, 'frames.sav');

    const questionOptions = store.getActions()[0].payload.questions()[0].options;

    expect(questionOptions.length).toBe(2);

    // "click" the deny button
    store.getActions()[0].payload.deny();

    expect(store.getActions()[1].type).toBe('CONFIRM_ANSWERED');

    return call.then((images) => {
      expect(images).toStrictEqual([]);
    });
  });

  it('resolves with images without asking a question', () => {
    const store = mockStore({
      frames: [],
    });

    return getTransformSav(store)(mockSav, 'frames.sav')
      .then((images) => {
        expect(images).toStrictEqual(framesIntResult);
      });
  });

});
