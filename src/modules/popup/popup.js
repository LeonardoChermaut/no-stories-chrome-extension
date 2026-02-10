(() => {
  const elements = {
    facebook: document.getElementById("facebook"),
    instagram: document.getElementById("instagram"),
    facebookAds: document.getElementById("facebookAds"),
  };

  const syncCheckboxesWithState = (config) => {
    if (!elements.facebook || !elements.instagram || !elements.facebookAds)
      return;

    elements.facebook.checked = config.facebookStoriesEnabled;
    elements.instagram.checked = config.instagramStoriesEnabled;
    elements.facebookAds.checked = config.facebookAdsEnabled;
  };

  const updatePreferencesFromUI = async () =>
    await Utils.storage.set({
      facebookStoriesEnabled: elements.facebook?.checked,
      instagramStoriesEnabled: elements.instagram?.checked,
      facebookAdsEnabled: elements.facebookAds?.checked,
    });

  const init = async () => {
    const config = await Utils.storage.get();
    syncCheckboxesWithState(config);

    elements.facebook?.addEventListener("change", updatePreferencesFromUI);
    elements.instagram?.addEventListener("change", updatePreferencesFromUI);
    elements.facebookAds?.addEventListener("change", updatePreferencesFromUI);
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      getCurrentConfig: () => ({
        facebookStoriesEnabled: elements.facebook?.checked,
        instagramStoriesEnabled: elements.instagram?.checked,
        facebookAdsEnabled: elements.facebookAds?.checked,
      }),
      syncCheckboxesWithState,
      fetchUserPreferences: () => Utils.storage.get(),
    };
  }
})();
