import mapCartFrameToName from '../../../javascript/tools/transformSav/mapCartFrameToName';

test('mapCartFrameToName with no frames existing', () => {
  expect(mapCartFrameToName(0, '', []))
    .toBe('int01');
  expect(mapCartFrameToName(1, '', []))
    .toBe('int01');
});

test('mapCartFrameToName with "int" frames existing', () => {
  expect(mapCartFrameToName(1, 'int', [
    { id: 'int01' },
    { id: 'int02' },
    { id: 'int03' },
    { id: 'int04' },
  ]))
    .toBe('int02');
});

test('mapCartFrameToName with "int" frames existing but "jp" preferred', () => {
  expect(mapCartFrameToName(2, 'jp', [
    { id: 'int01' },
    { id: 'int02' },
    { id: 'int03' },
    { id: 'int04' },
  ]))
    .toBe('int03');
});

test('mapCartFrameToName with "int" and some "jp" frames existing with existing "JP" preferred', () => {
  expect(mapCartFrameToName(0, 'jp', [
    { id: 'int01' },
    { id: 'int02' },
    { id: 'int03' },
    { id: 'jp01' },
  ]))
    .toBe('jp01');
});

test('mapCartFrameToName with "int" and some "jp" frames existing but missing "JP" preferred', () => {
  expect(mapCartFrameToName(2, 'jp', [
    { id: 'int01' },
    { id: 'int02' },
    { id: 'int03' },
    { id: 'jp01' },
  ]))
    .toBe('int03');
});
