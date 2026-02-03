(() => {
  const CURRENT_STATE = {
    config: null,
    observer: null,
  };

  const {
    reloadPage,
    debounce,
    updateCssAttributes,
    storage: { STORIES_KEY },
  } = Utils;

  const { isFacebookUrl, removeStoriesHtmlElement: removeFacebookStories } =
    Facebook;
  const { isInstagramUrl, removeStoriesHtmlElement: removeInstagramStories } =
    Instagram;

  const loadConfiguration = () =>
    new Promise((resolve) =>
      chrome.storage.sync.get(STORIES_KEY, (result) =>
        resolve(result[STORIES_KEY] || Utils.storage.get()),
      ),
    );

  const handleRemoveStories = () => {
    if (isFacebookUrl() && CURRENT_STATE.config.facebookStoriesEnabled) {
      removeFacebookStories();
    }

    if (isInstagramUrl() && CURRENT_STATE.config.instagramStoriesEnabled) {
      removeInstagramStories();
    }
  };

  const setupMutationObserver = () => {
    if (CURRENT_STATE.observer) CURRENT_STATE.observer.disconnect();

    const debouncedRemove = debounce(handleRemoveStories, 150);
    CURRENT_STATE.observer = new MutationObserver(debouncedRemove);
    CURRENT_STATE.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const handleChangeConfiguration = (changes, area) => {
    if (area !== "sync" || !changes[STORIES_KEY]) return;

    const previous = CURRENT_STATE.config;
    const current = changes[STORIES_KEY]?.newValue;

    if (!current) return;

    if (
      isFacebookUrl() &&
      previous.facebookStoriesEnabled &&
      !current.facebookStoriesEnabled
    ) {
      reloadPage();
      return;
    }

    if (
      isInstagramUrl() &&
      previous.instagramStoriesEnabled &&
      !current.instagramStoriesEnabled
    ) {
      reloadPage();
      return;
    }

    CURRENT_STATE.config = current;
    updateCssAttributes(current);
    handleRemoveStories();
  };

  const init = async () => {
    CURRENT_STATE.config = await loadConfiguration();

    updateCssAttributes(CURRENT_STATE.config);
    handleRemoveStories();

    setupMutationObserver();

    chrome.storage.onChanged.addListener(handleChangeConfiguration);
    console.log("[NO STORIES] Optimized script active");
  };

  init();

  if (typeof module !== "undefined") {
    module.exports = {
      loadConfiguration,
    };
  }
})();
