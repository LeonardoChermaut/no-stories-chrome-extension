const Instagram = {
  hostname: "www.instagram.com",

  selectors: ['[data-pagelet="story_tray"]', ".x1njnjl6"],

  isInstagramUrl: (loc = location) => loc.hostname.includes(Instagram.hostname),

  removeStoriesHtmlElement: () =>
    Utils.removeHtmlBySelectors(Instagram.selectors),
};

if (typeof window !== "undefined") window.Instagram = Instagram;
if (typeof module !== "undefined") module.exports = Instagram;
