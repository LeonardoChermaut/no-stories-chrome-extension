const { removeHtmlBySelector } = require("../utils/utils");

const Facebook = {
  selectors: [
    ".x9f619.x1n2onr6.x1ja2u2z.x1wsgfga.x9otpla.xwib8y2.x1y1aw1k",
    'div[aria-label="Bandeja de stories"][role="grid"]',
    'div[aria-label="Stories tray"][role="grid"]',
    '[data-pagelet*="Stories"]',
    '[data-pagelet*="story"]',
  ],

  removeStoriesHtmlElement: () => removeHtmlBySelector(Facebook.selectors),
};

if (typeof module !== "undefined") {
  module.exports = Facebook;
}
