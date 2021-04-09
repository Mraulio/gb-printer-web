const fetchMock = require('jest-fetch-mock');
const loadBinaries = require('./loadBinaries');

fetchMock.enableFetchMocks();

loadBinaries('src/tests/mockdata/binary');
