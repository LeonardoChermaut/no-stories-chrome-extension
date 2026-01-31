const InstagramStoriesRemover = require("../src/modules/instagram");

describe("InstagramStoriesRemover", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Should remove element with data-pagelet story_tray", () => {
    document.body.innerHTML = '<div data-pagelet="story_tray">stories</div>';

    const result = InstagramStoriesRemover.remove();

    expect(result).toBe(true);
    expect(document.querySelector('[data-pagelet="story_tray"]')).toBeNull();
  });

  test("Should remove element with specific Instagram class", () => {
    document.body.innerHTML = '<div class="x1njnjl6">stories</div>';

    const result = InstagramStoriesRemover.remove();

    expect(result).toBe(true);
    expect(document.querySelectorAll(".x1njnjl6").length).toBe(0);
  });
});
