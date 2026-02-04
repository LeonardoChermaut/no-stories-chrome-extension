describe("Instagram", () => {
  test("Should remove element with data-pagelet story_tray", () => {
    createElement('<div data-pagelet="story_tray">stories</div>');

    const storiesRemoved = Instagram.removeStoriesFromDom();

    expect(storiesRemoved).toBe(true);
    expect(document.querySelector('[data-pagelet="story_tray"]')).toBeNull();
  });

  test("Should remove element with specific Instagram class", () => {
    createElement('<div class="x1njnjl6">stories</div>');

    const storiesRemoved = Instagram.removeStoriesFromDom();

    expect(storiesRemoved).toBe(true);
    expect(document.querySelectorAll(".x1njnjl6").length).toBe(0);
  });
});
