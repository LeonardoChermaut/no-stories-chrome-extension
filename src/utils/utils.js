const Utils = {
  storage: {
    STORIES_KEY: "disableStoriesConfig",
    get: () => ({
      facebookStoriesEnabled: true,
      instagramStoriesEnabled: true,
    }),
    set: (config) =>
      chrome.storage.sync.set({ [Utils.storage.STORIES_KEY]: config }),
  },

  elements: {
    get facebook() {
      return Utils.getElement("facebook");
    },
    get instagram() {
      return Utils.getElement("instagram");
    },
  },

  isFacebookUrl: (loc = location) =>
    loc.hostname.includes(Utils.locations.facebook.hostname),
  isInstagramUrl: (loc = location) =>
    loc.hostname.includes(Utils.locations.instagram.hostname),

  reloadPage: () => window.location.reload(),

  createElement: (html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return document.body.appendChild(template.content.firstChild);
  },

  getElement: (id) => document.getElementById(id),

  removeHtmlBySelectors: (selectors) => {
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
