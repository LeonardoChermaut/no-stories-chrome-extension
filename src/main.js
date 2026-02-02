(() => {
  const STORAGE_KEY = "disableStoriesConfig";
  const DEFAULTS = { facebook: true, instagram: true };
  const INTERVAL = 2000;

  const isFacebookUrl = (loc = location) =>
    loc.hostname.includes("facebook.com");
  const isInstagramUrl = (loc = location) =>
    loc.hostname.includes("instagram.com");

  const loadConfig = () =>
    new Promise((resolve) => {
      chrome.storage.sync.get(STORAGE_KEY, (result) => {
        resolve(result[STORAGE_KEY] || DEFAULTS);
      });
    });

  const state = {
    config: null,
    observer: null,
    intervalId: null,
  };

  const run = (loc = location) => {
    if (isFacebookUrl(loc) && state.config.facebook) {
      Facebook.removeStoriesHtmlElement();
    }

    if (isInstagramUrl(loc) && state.config.instagram) {
      Instagram.removeStoriesHtmlElement();
    }
  };

  const observeDom = () => {
    state.observer = new MutationObserver(() => run());
    state.observer.observe(document.body, { childList: true, subtree: true });
  };

  const startInterval = () =>
    (state.intervalId = setInterval(() => run(), INTERVAL));

  const handleConfigChange = (changes, area) => {
    if (area !== "sync" || !changes[STORAGE_KEY]) return;

    const previous = state.config;
    const current = changes[STORAGE_KEY].newValue;

    if (isFacebookUrl() && previous.facebook && !current.facebook) {
      location.reload();
      return;
    }

    if (isInstagramUrl() && previous.instagram && !current.instagram) {
      location.reload();
      return;
    }

    state.config = current;
    run();

    console.log("[NO STORIES] Config updated:", state.config);
  };

  const init = async () => {
    state.config = await loadConfig();

    run();
    observeDom();
    startInterval();

    chrome.storage.onChanged.addListener(handleConfigChange);

    console.log("[NO STORIES] Active:", state.config);
  };

  document.body ? init() : document.addEventListener("DOMContentLoaded", init);

  if (typeof module !== "undefined") {
    module.exports = {
      isFacebookUrl,
      isInstagramUrl,
      run,
    };
  }
})();
