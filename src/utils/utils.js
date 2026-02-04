const Utils = {
  storage: {
    STORIES_KEY: "disableStoriesConfig",
    defaultConfig: {
      facebookStoriesEnabled: true,
      instagramStoriesEnabled: true,
    },
    get: () =>
      new Promise((resolve) =>
        chrome.storage.sync.get(Utils.storage.STORIES_KEY, (result) =>
          resolve(
            result[Utils.storage.STORIES_KEY] || Utils.storage.defaultConfig,
          ),
        ),
      ),
    set: (config) =>
      chrome.storage.sync.set({ [Utils.storage.STORIES_KEY]: config }),
  },

  debounce: (func = () => {}, wait = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  reloadPage: () => window.location.reload(),

  getElementById: (id) => document.getElementById(id),

  removeElementsBySelectors: (selectors) => {
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);

      if (elements.length > 0) {
        elements.forEach((el) => el.remove());
        return true;
      }
    }
    return false;
  },
};

if (typeof module !== "undefined") module.exports = Utils;
if (typeof window !== "undefined") window.Utils = Utils;
