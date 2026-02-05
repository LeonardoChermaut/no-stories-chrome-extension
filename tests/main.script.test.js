describe("Content Script", () => {
  let MainScript;

  beforeEach(() => {
    jest.resetModules();
    document.documentElement.removeAttribute("data-no-stories-facebook");
    document.documentElement.removeAttribute("data-no-stories-instagram");
    jest.restoreAllMocks();
  });

  describe("Domain Detection", () => {
    test("Should return true for facebook.com", () => {
      expect(Facebook.isFacebookDomain({ hostname: Facebook.hostname })).toBe(
        true,
      );
    });

    test("Should return true for instagram.com", () => {
      expect(
        Instagram.isInstagramDomain({ hostname: Instagram.hostname }),
      ).toBe(true);
    });
  });

  describe("setStoriesVisibilityDataAttributes", () => {
    test("Should add attribute if on Instagram and config is true", () => {
      jest.spyOn(Instagram, "isInstagramDomain").mockReturnValue(true);
      jest.spyOn(Facebook, "isFacebookDomain").mockReturnValue(false);

      MainScript = require("../src/main");

      MainScript.setStoriesVisibilityDataAttributes({
        instagramStoriesEnabled: true,
      });

      expect(
        document.documentElement.getAttribute("data-no-stories-instagram"),
      ).toBe("enabled");
    });

    test("Should remove attribute if on Instagram and config is false", () => {
      jest.spyOn(Instagram, "isInstagramDomain").mockReturnValue(true);
      jest.spyOn(Facebook, "isFacebookDomain").mockReturnValue(false);

      MainScript = require("../src/main");
      document.documentElement.setAttribute(
        "data-no-stories-instagram",
        "enabled",
      );

      MainScript.setStoriesVisibilityDataAttributes({
        instagramStoriesEnabled: false,
      });

      expect(
        document.documentElement.hasAttribute("data-no-stories-instagram"),
      ).toBe(false);
    });

    test("Should not add Instagram attribute if on Facebook", () => {
      jest.spyOn(Instagram, "isInstagramDomain").mockReturnValue(false);
      jest.spyOn(Facebook, "isFacebookDomain").mockReturnValue(true);

      MainScript = require("../src/main");

      MainScript.setStoriesVisibilityDataAttributes({
        instagramStoriesEnabled: true,
      });

      expect(
        document.documentElement.hasAttribute("data-no-stories-instagram"),
      ).toBe(false);
    });
  });
});
