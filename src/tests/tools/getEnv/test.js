const FETCH_ERROR_MESSAGE = 'fetch error message';

describe('loadEnv and getEnv with fulfilled fetch', () => {

  let loadEnv;
  let getEnv;

  beforeEach(() => {
    jest.resetModules();
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ mockedProperty: true }));
    return import('../../../javascript/tools/getEnv')
      .then((module) => {
        loadEnv = module.loadEnv;
        getEnv = module.getEnv;
      });
  });

  it('getEnv returns null if called before loadEnv', () => {
    expect(getEnv()).toBe(null);
  });

  it('loadEnv loads environment data', () => (
    loadEnv()
      .then((data) => {
        expect(data.mockedProperty).toBeTruthy();

        expect(getEnv().mockedProperty).toBeTruthy();

        return loadEnv().then((data2) => {
          expect(data2.mockedProperty).toBeTruthy();
        });
      })
  ));
});

describe('loadEnv and getEnv with failed fetch', () => {

  let loadEnv;
  let getEnv;

  beforeEach(() => {
    jest.resetModules();
    fetch.resetMocks();
    fetch.mockReject(new Error(FETCH_ERROR_MESSAGE));
    return import('../../../javascript/tools/getEnv')
      .then((module) => {
        loadEnv = module.loadEnv;
        getEnv = module.getEnv;
      });
  });

  it('returns dummydata on fetch failure', () => (
    loadEnv()
      .then((data) => {
        expect(data.version).toBe('0.0.0');
        expect(data.error).toBe(FETCH_ERROR_MESSAGE);
        expect(getEnv().version).toBe('0.0.0');

        return loadEnv().then((data2) => {
          expect(data2.version).toBe('0.0.0');
        });
      })
  ));
});
