(() => {
  const elements = {
    facebook: Utils.getElementById("facebook"),
    instagram: Utils.getElementById("instagram"),
  };

  const syncCheckboxesWithState = (config) => {
    if (!elements.facebook || !elements.instagram) return;

    elements.facebook.checked = config.facebookStoriesEnabled;
    elements.instagram.checked = config.instagramStoriesEnabled;
  };

  const updatePreferencesFromUI = async () =>
    await Utils.storage.set({
      facebookStoriesEnabled: elements.facebook?.checked,
      instagramStoriesEnabled: elements.instagram?.checked,
    });

  const init = async () => {
    const config = await Utils.storage.get();
    syncCheckboxesWithState(config);

    elements.facebook?.addEventListener("change", updatePreferencesFromUI);
    elements.instagram?.addEventListener("change", updatePreferencesFromUI);
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      getCurrentConfig: () => ({
        facebookStoriesEnabled: elements.facebook?.checked,
        instagramStoriesEnabled: elements.instagram?.checked,
      }),
      syncCheckboxesWithState,
      fetchUserPreferences: () => Utils.storage.get(),
    };
  }
})();
