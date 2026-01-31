const main = require("../src/main");

describe("Content Script", () => {
  beforeEach(() => {
    jest.resetModules();
    global.FacebookStoriesRemover = { remove: jest.fn() };
    global.InstagramStoriesRemover = { remove: jest.fn() };

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Should return true for facebook.com", () => {
    const mockLocation = { hostname: "www.facebook.com" };
    expect(main.isFacebook(mockLocation)).toBe(true);
  });

  test("Should return true for instagram.com", () => {
    const mockLocation = { hostname: "www.instagram.com" };
    expect(main.isInstagram(mockLocation)).toBe(true);
  });
});
