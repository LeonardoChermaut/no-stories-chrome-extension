(() => {
  const state = {
    config: null,
    observer: null,
  };

  const { reloadPage, debounce, storage } = Utils;

  const {
    isFacebookDomain,
    removeStoriesFromDom: removeFacebookStories,
    removeAdsFromDom: removeFacebookAds,
  } = Facebook;
  const { isInstagramDomain, removeStoriesFromDom: removeInstagramStories } =
    Instagram;

  const setVisibilityDataAttributes = (config) => {
    if (!config) return;
    const html = document.documentElement;

    const hideFacebookStories =
      isFacebookDomain() && config.facebookStoriesEnabled === true;
    const hideFacebookAds =
      isFacebookDomain() && config.facebookAdsEnabled === true;
    const hideInstagramStories =
      isInstagramDomain() && config.instagramStoriesEnabled === true;

    const htmlMap = [
      { condition: hideFacebookStories, attribute: "data-no-stories-facebook" },
      { condition: hideFacebookAds, attribute: "data-no-ads-facebook" },
      {
        condition: hideInstagramStories,
        attribute: "data-no-stories-instagram",
      },
    ];

    htmlMap.forEach(({ condition, attribute }) =>
      condition
        ? html.setAttribute(attribute, "enabled")
        : html.removeAttribute(attribute),
    );
  };

  const removeConfigurationIfEnabled = () => {
    if (isFacebookDomain()) {
      if (state.config.facebookStoriesEnabled) {
        removeFacebookStories();
      }
      if (state.config.facebookAdsEnabled) {
        removeFacebookAds();
      }
    }

    if (isInstagramDomain() && state.config.instagramStoriesEnabled) {
      removeInstagramStories();
    }
  };

  const setupMutationObserver = () => {
    if (state.observer) state.observer.disconnect();

    const debouncedRemove = debounce(removeConfigurationIfEnabled, 150);
    state.observer = new MutationObserver(debouncedRemove);
    state.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const onConfigurationChanged = (changes, area) => {
    if (area !== "sync" || !changes[storage.STORAGE_KEY]) return;

    const previous = state.config;
    const current = changes[storage.STORAGE_KEY]?.newValue;

    if (!current) return;

    const shouldReloadFacebookPage =
      isFacebookDomain() &&
      ((previous.facebookStoriesEnabled && !current.facebookStoriesEnabled) ||
        (previous.facebookAdsEnabled && !current.facebookAdsEnabled));

    const shouldReloadInstagramPage =
      isInstagramDomain() &&
      previous.instagramStoriesEnabled &&
      !current.instagramStoriesEnabled;

    if (shouldReloadFacebookPage || shouldReloadInstagramPage) {
      reloadPage();
      return;
    }

    state.config = current;
    setVisibilityDataAttributes(current);
    removeConfigurationIfEnabled();
  };

  const init = async () => {
    state.config = await storage.get();

    setVisibilityDataAttributes(state.config);
    removeConfigurationIfEnabled();
    setupMutationObserver();

    chrome.storage.onChanged.addListener(onConfigurationChanged);
    console.log("[NO STORIES] Optimized script active");
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      fetchUserPreferences: () => storage.get(),
      setVisibilityDataAttributes,
    };
  }
})();
