(() => {
  const STORAGE_KEY = "disableStoriesConfig";
  const DEFAULTS = { facebook: true, instagram: true };

  const utils =
    typeof require !== "undefined" ? require("../utils/utils") : window;
  const { elements } = utils;

  const loadConfig = () =>
    new Promise((resolve) =>
      chrome.storage.sync.get(STORAGE_KEY, (result) =>
        resolve(result[STORAGE_KEY] || DEFAULTS),
      ),
    );

  const saveConfig = (config) =>
    new Promise((resolve) =>
      chrome.storage.sync.set({ [STORAGE_KEY]: config }, resolve),
    );

  const updateUI = (config) => {
    if (elements && elements.facebook && elements.instagram) {
      elements.facebook.checked = config.facebook;
      elements.instagram.checked = config.instagram;
    }
  };

  const getCurrentConfig = () => ({
    facebook: elements.facebook.checked,
    instagram: elements.instagram.checked,
  });

  const handleChange = async () => {
    const config = getCurrentConfig();
    await saveConfig(config);
  };

  const init = async () => {
    const config = await loadConfig();
    updateUI(config);

    if (elements && elements.facebook)
      elements.facebook.addEventListener("change", handleChange);
    if (elements && elements.instagram)
      elements.instagram.addEventListener("change", handleChange);
  };

  if (typeof module === "undefined") {
    init();
  }

  if (typeof module !== "undefined") {
    module.exports = {
      getCurrentConfig,
      updateUI,
      loadConfig,
      handlers: { handleChange },
    };
  }
})();
