describe("Content Script", () => {
  beforeEach(() => {
    const FACEBOOK_HOSTNAME = "www.facebook.com";
    const INSTAGRAM_HOSTNAME = "www.instagram.com";

    jest.resetModules();
    global.Facebook = {
      removeStoriesHtmlElement: jest.fn(),
      isFacebookUrl: jest.fn((hostname) =>
        hostname.includes(FACEBOOK_HOSTNAME),
      ),
      hostname: FACEBOOK_HOSTNAME,
    };
    global.Instagram = {
      removeStoriesHtmlElement: jest.fn(),
      isInstagramUrl: jest.fn((hostname) =>
        hostname.includes(INSTAGRAM_HOSTNAME),
      ),
      hostname: INSTAGRAM_HOSTNAME,
    };

    jest.useFakeTimers();
  });

  afterEach(() => jest.useRealTimers());

  test("Should return true for facebook.com", () =>
    expect(Facebook.isFacebookUrl(Facebook.hostname)).toBe(true));

  test("Should return true for instagram.com", () =>
    expect(Instagram.isInstagramUrl(Instagram.hostname)).toBe(true));
});
