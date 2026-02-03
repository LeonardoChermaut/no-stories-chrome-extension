const { elements, storage } = Utils;

const loadConfiguration = () =>
  new Promise((resolve) =>
    chrome.storage.sync.get(storage.STORIES_KEY, (result) =>
      resolve(result[storage.STORIES_KEY] || storage.get()),
    ),
  );

const saveConfiguration = (config) =>
  new Promise((resolve) =>
    chrome.storage.sync.set({ [storage.STORIES_KEY]: config }, resolve),
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

const init = async () => {
  const config = await loadConfiguration();
  handleChangeCheckbox(config);

  elements.facebook?.addEventListener("change", handleChangeConfiguration);
  elements.instagram?.addEventListener("change", handleChangeConfiguration);
};

init();

if (typeof module !== "undefined") {
  module.exports = {
    getCurrentConfig: () => ({
      facebookStoriesEnabled: elements.facebook?.checked,
      instagramStoriesEnabled: elements.instagram?.checked,
    }),
    handleChangeCheckbox,
  };
}
