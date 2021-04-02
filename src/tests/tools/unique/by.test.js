import uniqueBy from '../../../javascript/tools/unique/by';

test('uniqueBy', () => {
  const uniqueById = uniqueBy('id');

  expect(uniqueById([{ id: 1 }, { id: '1' }, { id: 'x' }, { id: 'x' }])).toStrictEqual([{ id: 1 }, { id: '1' }, { id: 'x' }]);
});
