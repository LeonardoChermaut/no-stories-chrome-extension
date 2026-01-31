const { removeHtmlBySelector } = require("../utils/utils");

const Instagram = {
  selectors: ['[data-pagelet="story_tray"]', ".x1njnjl6"],

  removeStoriesHtmlElement: () => removeHtmlBySelector(Instagram.selectors),
};

if (typeof module !== "undefined") {
  module.exports = Instagram;
}
