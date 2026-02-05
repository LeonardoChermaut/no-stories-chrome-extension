(() => {
  const state = {
    config: null,
    observer: null,
  };

  const { reloadPage, debounce, storage } = Utils;

  const { isFacebookDomain, removeStoriesFromDom: removeFacebookStories } =
    Facebook;
  const { isInstagramDomain, removeStoriesFromDom: removeInstagramStories } =
    Instagram;

  const updateCssAttributes = (config) => {
    if (!config) return;
    const html = document.documentElement;

    const hideFacebook =
      isFacebookDomain() && config.facebookStoriesEnabled === true;
    const hideInstagram =
      isInstagramDomain() && config.instagramStoriesEnabled === true;

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
  };

  const handleRemoveStories = () => {
    if (isFacebookDomain() && state.config.facebookStoriesEnabled) {
      removeFacebookStories();
    }

    if (isInstagramDomain() && state.config.instagramStoriesEnabled) {
      removeInstagramStories();
    }
  };

  const setupMutationObserver = () => {
    if (state.observer) state.observer.disconnect();

    const debouncedRemove = debounce(handleRemoveStories, 150);
    state.observer = new MutationObserver(debouncedRemove);
    state.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const handleChangeConfiguration = (changes, area) => {
    if (area !== "sync" || !changes[storage.STORAGE_KEY]) return;

    const previous = state.config;
    const current = changes[storage.STORAGE_KEY]?.newValue;

    if (!current) return;

    const shouldReloadFacebookPage =
      isFacebookDomain() &&
      previous.facebookStoriesEnabled &&
      !current.facebookStoriesEnabled;

    const shouldReloadInstagramPage =
      isInstagramDomain() &&
      previous.instagramStoriesEnabled &&
      !current.instagramStoriesEnabled;

    if (shouldReloadFacebookPage || shouldReloadInstagramPage) {
      reloadPage();
      return;
    }

    state.config = current;
    updateCssAttributes(current);
    handleRemoveStories();
  };

  const init = async () => {
    state.config = await storage.get();

    updateCssAttributes(state.config);
    handleRemoveStories();
    setupMutationObserver();

    chrome.storage.onChanged.addListener(handleChangeConfiguration);
    console.log("[NO STORIES] Optimized script active");
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      fetchUserPreferences: () => storage.get(),
      updateCssAttributes,
    };
  }
})();
