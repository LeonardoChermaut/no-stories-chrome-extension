const Instagram = {
  selectors: ['[data-pagelet="story_tray"]', ".x1njnjl6"],

  removeStoriesHtmlElement: () =>
    Utils.removeHtmlBySelector(Instagram.selectors),
};

if (typeof window !== "undefined") window.Instagram = Instagram;
if (typeof module !== "undefined") module.exports = Instagram;
