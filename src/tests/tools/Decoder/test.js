import Decoder from '../../../javascript/tools/Decoder';
import dummy from './dummy';

describe('Decoder.update', () => {
  let decoder;
  let canvas;
  let context;
  let putImageData;

  beforeEach(() => {
    decoder = new Decoder();
    canvas = document.createElement('canvas');
    canvas.width = 160;
    context = canvas.getContext('2d');
    putImageData = jest.spyOn(context, 'putImageData');
  });

  it('renders an image', () => {
    decoder.update({
      canvas,
      tiles: dummy,
    });

    expect(putImageData.mock.calls.length).toBe(1); // calle only once
    expect(putImageData.mock.calls[0][1]).toBe(0); // x coordinate
    expect(putImageData.mock.calls[0][2]).toBe(0); // y coordinate
    expect(putImageData.mock.calls[0][0].width).toBe(160); // x dimension
    expect(putImageData.mock.calls[0][0].height).toBe(144); // y dimension
    expect(putImageData.mock.calls[0][0].data).toMatchSnapshot();
  });

  it('renders an image with a palette', () => {
    decoder.update({
      canvas,
      tiles: dummy,
      palette: ['#ffd484', '#6ab300', '#006262', '#44005f'],
    });

    expect(putImageData.mock.calls.length).toBe(1); // calle only once
    expect(putImageData.mock.calls[0][1]).toBe(0); // x coordinate
    expect(putImageData.mock.calls[0][2]).toBe(0); // y coordinate
    expect(putImageData.mock.calls[0][0].width).toBe(160); // x dimension
    expect(putImageData.mock.calls[0][0].height).toBe(144); // y dimension
    expect(putImageData.mock.calls[0][0].data).toMatchSnapshot();
  });

  it('renders an image with a palette without affecting the frame', () => {
    decoder.update({
      canvas,
      tiles: dummy,
      palette: ['#ffd484', '#6ab300', '#006262', '#44005f'],
      lockFrame: true,
    });

    expect(putImageData.mock.calls.length).toBe(1); // calle only once
    expect(putImageData.mock.calls[0][1]).toBe(0); // x coordinate
    expect(putImageData.mock.calls[0][2]).toBe(0); // y coordinate
    expect(putImageData.mock.calls[0][0].width).toBe(160); // x dimension
    expect(putImageData.mock.calls[0][0].height).toBe(144); // y dimension
    expect(putImageData.mock.calls[0][0].data).toMatchSnapshot();
  });

  it('renders an image with a inverted palette', () => {
    decoder.update({
      canvas,
      tiles: dummy,
      palette: ['#ffd484', '#6ab300', '#006262', '#44005f'],
      invertPalette: true,
    });

    expect(putImageData.mock.calls.length).toBe(1); // calle only once
    expect(putImageData.mock.calls[0][1]).toBe(0); // x coordinate
    expect(putImageData.mock.calls[0][2]).toBe(0); // y coordinate
    expect(putImageData.mock.calls[0][0].width).toBe(160); // x dimension
    expect(putImageData.mock.calls[0][0].height).toBe(144); // y dimension
    expect(putImageData.mock.calls[0][0].data).toMatchSnapshot();
  });


  it('renders an image with a inverted palette without affecting the frame', () => {
    decoder.update({
      canvas,
      tiles: dummy,
      palette: ['#ffd484', '#6ab300', '#006262', '#44005f'],
      invertPalette: true,
      lockFrame: true,
    });

    expect(putImageData.mock.calls.length).toBe(1); // calle only once
    expect(putImageData.mock.calls[0][1]).toBe(0); // x coordinate
    expect(putImageData.mock.calls[0][2]).toBe(0); // y coordinate
    expect(putImageData.mock.calls[0][0].width).toBe(160); // x dimension
    expect(putImageData.mock.calls[0][0].height).toBe(144); // y dimension
    expect(putImageData.mock.calls[0][0].data).toMatchSnapshot();
  });
});
