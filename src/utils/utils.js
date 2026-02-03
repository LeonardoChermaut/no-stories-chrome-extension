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

  updateCssAttributes: (config) => {
    if (!config) return;

    const html = document.documentElement;

    if (config.facebookStoriesEnabled) {
      html.setAttribute("data-no-stories-facebook", "enabled");
    } else {
      html.removeAttribute("data-no-stories-facebook");
    }

    if (config.instagramStoriesEnabled) {
      html.setAttribute("data-no-stories-instagram", "enabled");
    } else {
      html.removeAttribute("data-no-stories-instagram");
    }
  },

  debounce: (func = () => {}, wait = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

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
