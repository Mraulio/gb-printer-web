import updateIfDefined from '../../../javascript/tools/updateIfDefined';

test('updateIfDefined', () => {
  expect(updateIfDefined()).toBe(undefined);
  expect(updateIfDefined('value0', undefined)).toBe('value0');
  expect(updateIfDefined(undefined, 'value1')).toBe('value1');
  expect(updateIfDefined('value2', 'value1')).toBe('value2');
});
