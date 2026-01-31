const STORAGE_KEY = "noStoriesConfiguration";
const DEFAULTS = { facebook: true, instagram: true };

const { elements } = require("../utils/utils");

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
  elements.facebook.checked = config.facebook;
  elements.instagram.checked = config.instagram;
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

  elements.facebook.addEventListener("change", handleChange);
  elements.instagram.addEventListener("change", handleChange);
};

init();

if (typeof module !== "undefined") {
  module.exports = {
    getCurrentConfig,
    updateUI,
    loadConfig,
    handlers: { handleChange },
  };
}
