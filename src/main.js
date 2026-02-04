(() => {
  const state = {
    config: null,
    observer: null,
  };

  const {
    reloadPage,
    debounce,
    storage: { STORIES_KEY, get },
  } = Utils;

  const { isFacebookDomain, removeStoriesFromDom: removeFacebookStories } =
    Facebook;
  const { isInstagramDomain, removeStoriesFromDom: removeInstagramStories } =
    Instagram;

  const updateCssAttributes = (config) => {
    if (!config) return;
    const html = document.documentElement;

    if (config.facebookStoriesEnabled) {
      html.setAttribute("data-no-stories-facebook", "enabled");
    } else {
      html.removeAttribute("data-no-stories-facebook");
    }

    // if (config.instagramStoriesEnabled) {
    //   html.setAttribute("data-no-stories-instagram", "enabled");
    // } else {
    //   html.removeAttribute("data-no-stories-instagram");
    // }
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
    if (area !== "sync" || !changes[STORIES_KEY]) return;

    const previous = state.config;
    const current = changes[STORIES_KEY]?.newValue;

    if (!current) return;

    if (
      isFacebookDomain() &&
      previous.facebookStoriesEnabled &&
      !current.facebookStoriesEnabled
    ) {
      reloadPage();
      return;
    }

    if (
      isInstagramDomain() &&
      previous.instagramStoriesEnabled &&
      !current.instagramStoriesEnabled
    ) {
      reloadPage();
      return;
    }

    state.config = current;
    updateCssAttributes(current);
    handleRemoveStories();
  };

  const init = async () => {
    state.config = await get();

    // TODO: Fix this so that when stories are enabled to be viewed, the CSS properties are not imported.
    // updateCssAttributes(state.config);
    handleRemoveStories();
    setupMutationObserver();

    chrome.storage.onChanged.addListener(handleChangeConfiguration);
    console.log("[NO STORIES] Optimized script active");
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      fetchUserPreferences: get,
    };
  }
})();
