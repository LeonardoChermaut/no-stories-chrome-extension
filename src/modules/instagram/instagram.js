const Instagram = {
  hostname: "www.instagram.com",
  storyContainersSelectors: ['[data-pagelet="story_tray"]', ".x1njnjl6"],

  removeStoriesFromDom: () =>
    Utils.removeElementsBySelectors(Instagram.storyContainersSelectors),

  isInstagramDomain: (loc = location) =>
    loc.hostname.includes(Instagram.hostname),
};

if (typeof window !== "undefined") window.Instagram = Instagram;
if (typeof module !== "undefined") module.exports = Instagram;
