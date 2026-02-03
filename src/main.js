(() => {
  const TIMER = 2000;
  const CURRENT_STATE = {
    config: null,
    observer: null,
    intervalId: null,
  };

  const {
    reloadPage,
    storage: { STORIES_KEY },
  } = Utils;

  const { isFacebookUrl, removeStoriesHtmlElement: removeFacebookStories } =
    Facebook;
  const { isInstagramUrl, removeStoriesHtmlElement: removeInstagramStories } =
    Instagram;

  const loadConfig = () =>
    new Promise((resolve) =>
      chrome.storage.sync.get(STORIES_KEY, (result) =>
        resolve(result[STORIES_KEY] || Utils.storage.get()),
      ),
    );

  const handleRemoveStories = (loc = location) => {
    if (isFacebookUrl(loc) && CURRENT_STATE.config.facebookStoriesEnabled) {
      removeFacebookStories();
    }

    if (isInstagramUrl(loc) && CURRENT_STATE.config.instagramStoriesEnabled) {
      removeInstagramStories();
    }
  };

  const mutationObserverDom = () => {
    CURRENT_STATE.observer = new MutationObserver(() => handleRemoveStories());
    CURRENT_STATE.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const sleep = (timer = TIMER) =>
    new Promise((resolve) => {
      CURRENT_STATE.intervalId = setInterval(
        () => handleRemoveStories(),
        timer,
      );
      resolve();
    });

  const handleChangeConfiguration = (changes, area) => {
    if (area !== "sync" || !changes[STORIES_KEY]) return;

    const previous = CURRENT_STATE.config;
    const current = changes[STORIES_KEY]?.newValue;

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
    handleRemoveStories();

    console.log("[NO STORIES] Config updated:", CURRENT_STATE.config);
  };

  const init = async () => {
    CURRENT_STATE.config = await loadConfig();

    handleRemoveStories();
    mutationObserverDom();
    sleep();

    chrome.storage.onChanged.addListener(handleChangeConfiguration);

    console.log("[NO STORIES] Active:", CURRENT_STATE.config);
  };

  document.body ? init() : document.addEventListener("DOMContentLoaded", init);

  if (typeof module !== "undefined") {
    module.exports = {
      loadConfig,
    };
  }
})();
