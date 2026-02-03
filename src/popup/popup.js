const STORAGE_KEY = "disableStoriesConfig";
const { elements, storage } = Utils;

const loadConfiguration = () =>
  new Promise((resolve) =>
    chrome.storage.sync.get(STORAGE_KEY, (result) =>
      resolve(result[STORAGE_KEY] || storage.get()),
    ),
  );

const saveConfiguration = (config) =>
  new Promise((resolve) =>
    chrome.storage.sync.set({ [STORAGE_KEY]: config }, resolve),
  );

const handleChangeCheckbox = (config) => {
  if (!elements.facebook || !elements.instagram) return;

  elements.facebook.checked = config.facebookStoriesEnabled;
  elements.instagram.checked = config.instagramStoriesEnabled;
};

const handleChangeConfiguration = async () =>
  await saveConfiguration({
    facebookStoriesEnabled: elements.facebook?.checked,
    instagramStoriesEnabled: elements.instagram?.checked,
  });

const start = async () => {
  const config = await loadConfiguration();
  handleChangeCheckbox(config);

  elements.facebook?.addEventListener("change", handleChangeConfiguration);
  elements.instagram?.addEventListener("change", handleChangeConfiguration);
};

start();

if (typeof module !== "undefined") {
  module.exports = {
    getCurrentConfig: () => ({
      facebookStoriesEnabled: elements.facebook?.checked,
      instagramStoriesEnabled: elements.instagram?.checked,
    }),
    handleChangeCheckbox,
  };
}
