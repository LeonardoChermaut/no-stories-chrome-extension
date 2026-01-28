const InstagramStoriesRemover = {
  selectors: ['[data-pagelet="story_tray"]', ".x1njnjl6"],

  remove: () => {
    for (const selector of InstagramStoriesRemover.selectors) {
      const elements = document.querySelectorAll(selector);

      if (elements.length > 0) {
        elements.forEach((el) => el.remove());
        return true;
      }
    }
    return false;
  },
};
