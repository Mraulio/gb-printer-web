import mapCartFrameToName from '../../../javascript/tools/transformSav/mapCartFrameToName';

const noFrames = [];
const intFrames = [
  { id: 'int01' },
  { id: 'int02' },
];
const jpFrames = [
  { id: 'jp03' },
  { id: 'jp04' },
];
const customFrames = [
  { id: 'custom01' },
  { id: 'custom02' },
];

test('mapCartFrameToName with no frames existing', () => {
  expect(mapCartFrameToName(0, '', noFrames)).toBe('int01');
  expect(mapCartFrameToName(1, '', noFrames)).toBe('int01');
  expect(mapCartFrameToName(100, '', noFrames)).toBe('int01');

  expect(mapCartFrameToName(0, '', [...intFrames, ...jpFrames, ...customFrames])).toBe('int01');
  expect(mapCartFrameToName(1, '', [...intFrames, ...jpFrames, ...customFrames])).toBe('int02');
  expect(mapCartFrameToName(100, '', [...intFrames, ...jpFrames, ...customFrames])).toBe('int01');

  expect(mapCartFrameToName(0, '', intFrames)).toBe('int01');
  expect(mapCartFrameToName(1, '', intFrames)).toBe('int02');
  expect(mapCartFrameToName(100, '', intFrames)).toBe('int01');

  expect(mapCartFrameToName(0, 'int', intFrames)).toBe('int01');
  expect(mapCartFrameToName(1, 'int', intFrames)).toBe('int02');
  expect(mapCartFrameToName(100, 'int', intFrames)).toBe('int01');

  expect(mapCartFrameToName(0, 'jp', intFrames)).toBe('int01');
  expect(mapCartFrameToName(1, 'jp', intFrames)).toBe('int02');
  expect(mapCartFrameToName(100, 'jp', intFrames)).toBe('int01');

  expect(mapCartFrameToName(0, 'jp', intFrames)).toBe('int01');
  expect(mapCartFrameToName(1, 'jp', intFrames)).toBe('int02');
  expect(mapCartFrameToName(100, 'jp', intFrames)).toBe('int01');

  expect(mapCartFrameToName(0, 'jp', [...intFrames, ...jpFrames])).toBe('int01');
  expect(mapCartFrameToName(1, 'jp', [...intFrames, ...jpFrames])).toBe('int02');
  expect(mapCartFrameToName(2, 'jp', [...intFrames, ...jpFrames])).toBe('jp03');
  expect(mapCartFrameToName(3, 'jp', [...intFrames, ...jpFrames])).toBe('jp04');
  expect(mapCartFrameToName(300, 'jp', [...intFrames, ...jpFrames])).toBe('int01');

  expect(mapCartFrameToName(0, 'custom', [...intFrames, ...jpFrames])).toBe('int01');
  expect(mapCartFrameToName(1, 'custom', [...intFrames, ...jpFrames])).toBe('int02');
  expect(mapCartFrameToName(100, 'custom', [...intFrames, ...jpFrames])).toBe('int01');

  expect(mapCartFrameToName(0, 'custom', [...intFrames, ...jpFrames, ...customFrames])).toBe('custom01');
  expect(mapCartFrameToName(1, 'custom', [...intFrames, ...jpFrames, ...customFrames])).toBe('custom02');
  expect(mapCartFrameToName(100, 'custom', [...intFrames, ...jpFrames, ...customFrames])).toBe('custom01');
});
