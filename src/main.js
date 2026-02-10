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

  const setStoriesVisibilityDataAttributes = (config) => {
    if (!config) return;
    const html = document.documentElement;

    const hideFacebook =
      isFacebookDomain() && config.facebookStoriesEnabled === true;
    const hideInstagram =
      isInstagramDomain() && config.instagramStoriesEnabled === true;

    const hideFacebookAds =
      isFacebookDomain() && config.facebookAdsEnabled === true;

    if (hideFacebook) {
      html.setAttribute("data-no-stories-facebook", "enabled");
    } else {
      html.removeAttribute("data-no-stories-facebook");
    }

    if (hideInstagram) {
      html.setAttribute("data-no-stories-instagram", "enabled");
    } else {
      html.removeAttribute("data-no-stories-instagram");
    }

    if (hideFacebookAds) {
      html.setAttribute("data-no-ads-facebook", "enabled");
    } else {
      html.removeAttribute("data-no-ads-facebook");
    }
  };

  const removeStoriesIfEnabled = () => {
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

    const debouncedRemove = debounce(removeStoriesIfEnabled, 150);
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
    setStoriesVisibilityDataAttributes(current);
    removeStoriesIfEnabled();
  };

  const init = async () => {
    state.config = await storage.get();

    setStoriesVisibilityDataAttributes(state.config);
    removeStoriesIfEnabled();
    setupMutationObserver();

    chrome.storage.onChanged.addListener(onConfigurationChanged);
    console.log("[NO STORIES] Optimized script active");
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      fetchUserPreferences: () => storage.get(),
      setStoriesVisibilityDataAttributes,
    };
  }
})();
