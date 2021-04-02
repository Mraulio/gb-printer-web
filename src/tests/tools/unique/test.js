import unique from '../../../javascript/tools/unique';

test('unique', () => {
  expect(unique([1, 1, 2, 2])).toStrictEqual([1, 2]);
});
