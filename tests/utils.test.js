describe("Utils", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    jest.clearAllMocks();
  });

  describe("Storage", () => {
    test("Get should return default config if storage is empty", async () => {
      chrome.storage.sync.get.mockImplementation((key, cb) => cb({}));
      const config = await Utils.storage.get();
      expect(config).toEqual(Utils.storage.defaultConfig);
    });

    test("Get should return stored config if present", async () => {
      const mockConfig = {
        facebookStoriesEnabled: false,
        instagramStoriesEnabled: false,
      };

      chrome.storage.sync.get.mockImplementation((key, cb) =>
        cb({ [Utils.storage.STORAGE_KEY]: mockConfig }),
      );

      const config = await Utils.storage.get();
      expect(config).toEqual(mockConfig);
    });

    test("Set should call chrome.storage.sync.set", () => {
      const newConfig = {
        facebookStoriesEnabled: true,
        instagramStoriesEnabled: false,
      };

      Utils.storage.set(newConfig);

      expect(chrome.storage.sync.set).toHaveBeenCalledWith({
        [Utils.storage.STORAGE_KEY]: newConfig,
      });
    });
  });

  describe("debounce", () => {
    test("Should only call function once after multiple rapid calls", () => {
      const func = jest.fn();
      const debounced = Utils.debounce(func, 100);

      debounced();
      debounced();
      debounced();

      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});
