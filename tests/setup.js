global.chrome = {
  storage: {
    sync: {
      get: jest.fn((key, cb) => cb({})),
      set: jest.fn((data, cb) => cb()),
    },
    onChanged: {
      addListener: jest.fn(),
    },
  },
};
