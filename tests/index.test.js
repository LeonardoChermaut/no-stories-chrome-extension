const main = require("../src/main");
const { locations } = require("../src/utils/utils");

describe("Content Script", () => {
  beforeEach(() => {
    jest.resetModules();
    global.facebook = { removeStoriesHtmlElement: jest.fn() };
    global.instagram = { removeStoriesHtmlElement: jest.fn() };

    jest.useFakeTimers();
  });

  afterEach(() => jest.useRealTimers());

  test("Should return true for facebook.com", () =>
    expect(main.isFacebookUrl(locations.facebook)).toBe(true));

  test("Should return true for instagram.com", () =>
    expect(main.isInstagramUrl(locations.instagram)).toBe(true));
});
