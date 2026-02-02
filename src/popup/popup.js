(() => {
  const STORAGE_KEY = "disableStoriesConfig";
  const DEFAULTS = { facebook: true, instagram: true };
  const elements = Utils.elements;

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

  const handleChange = async () => {
    const config = {
      facebook: elements.facebook.checked,
      instagram: elements.instagram.checked,
    };
    await saveConfig(config);
  };

  const init = async () => {
    const config = await loadConfig();
    updateUI(config);

    elements.facebook.addEventListener("change", handleChange);
    elements.instagram.addEventListener("change", handleChange);
  };

  init();
})();
