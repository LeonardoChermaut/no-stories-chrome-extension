describe("Facebook", () => {
  test("Should remove element when selector is found", () => {
    createElement('<div data-pagelet="Stories">content</div>');

    const storiesRemoved = Facebook.removeStoriesFromDom();

    expect(storiesRemoved).toBe(true);
    expect(document.querySelector('[data-pagelet="Stories"]')).toBeNull();
  });

  test("Should return false when no selector is found", () => {
    createElement("<div>outro conteúdo</div>");

    const storiesRemoved = Facebook.removeStoriesFromDom();

    expect(storiesRemoved).toBe(false);
  });

  test("Should remove multiple elements with the same selector", () => {
    createElement(`
      <div data-pagelet="Stories">1</div>
      <div data-pagelet="Stories">2</div>
    `);

    Facebook.removeStoriesFromDom();

    expect(document.querySelectorAll('[data-pagelet="Stories"]').length).toBe(
      0,
    );
  });
});
