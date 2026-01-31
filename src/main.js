(() => {
  const STORAGE_KEY = "disableStoriesConfig";
  const DEFAULTS = { facebook: true, instagram: true };

  const isFacebook = (loc = location) => loc.hostname.includes("facebook.com");
  const isInstagram = (loc = location) =>
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
    if (isFacebook(loc) && state.config.facebook) {
      FacebookStoriesRemover.remove();
    }

    if (isInstagram(loc) && state.config.instagram) {
      InstagramStoriesRemover.remove();
    }
  };

  const observeDom = () => {
    state.observer = new MutationObserver(() => run());
    state.observer.observe(document.body, { childList: true, subtree: true });
  };

  const startInterval = () => {
    state.intervalId = setInterval(() => run(), 2100);
  };

  const handleConfigChange = (changes, area) => {
    if (area !== "sync" || !changes[STORAGE_KEY]) return;

    const previous = state.config;
    const current = changes[STORAGE_KEY].newValue;

    if (isFacebook() && previous.facebook && !current.facebook) {
      location.reload();
      return;
    }

    if (isInstagram() && previous.instagram && !current.instagram) {
      location.reload();
      return;
    }

    state.config = current;
    run();

    console.log("[Disable Stories] Config updated:", state.config);
  };

  const init = async () => {
    state.config = await loadConfig();

    run();
    observeDom();
    startInterval();

    chrome.storage.onChanged.addListener(handleConfigChange);

    console.log("[Disable Stories] Active:", state.config);
  };

  document.body ? init() : document.addEventListener("DOMContentLoaded", init);

  if (typeof module !== "undefined") {
    module.exports = {
      isFacebook,
      isInstagram,
      run,
      // expose init for testing if needed, though run is enough for logic
    };
  }
})();
