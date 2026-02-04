const Facebook = {
  hostname: "www.facebook.com",

  storyContainersSelectors: [
    ".x9f619.x1n2onr6.x1ja2u2z.x1wsgfga.x9otpla.xwib8y2.x1y1aw1k",
    'div[aria-label="Bandeja de stories"][role="grid"]',
    'div[aria-label="Stories tray"][role="grid"]',
    '[data-pagelet*="Stories"]',
    '[data-pagelet*="story"]',
  ],

  removeStoriesFromDom: () =>
    Utils.removeElementsBySelectors(Facebook.storyContainersSelectors),

  isFacebookDomain: (loc = location) =>
    loc.hostname.includes(Facebook.hostname),
};

if (typeof window !== "undefined") window.Facebook = Facebook;
if (typeof module !== "undefined") module.exports = Facebook;
