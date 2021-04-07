import { loadEnv, getEnv } from '../../../javascript/tools/getEnv';

describe('loadEnv and getEnv', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns dummydata on fetch failure', () => {
    loadEnv()
      .then((data) => {
        expect(data.version).toBe('0.0.0');

        expect(getEnv().version).toBe('0.0.0');

        loadEnv().then((data2) => {
          expect(data2.version).toBe('0.0.0');
        });
      });
  });

});

describe('loadEnv and getEnv', () => {

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ mockedProperty: true }));
  });

  it('getEnv returns null if called before loadEnv', () => {
    expect(getEnv()).toBe(null);
  });

  it('loadEnv loads environment data', () => {
    loadEnv()
      .then((data) => {
        expect(data.mockedProperty).toBeTruthy();

        expect(getEnv().mockedProperty).toBeTruthy();

        loadEnv().then((data2) => {
          expect(data2.mockedProperty).toBeTruthy();
        });
      });
  });
});
