const FacebookStoriesRemover = require("../src/modules/facebook");

describe("FacebookStoriesRemover", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Should remove element when selector is found", () => {
    document.body.innerHTML = '<div data-pagelet="Stories">content</div>';

    const result = FacebookStoriesRemover.remove();

    expect(result).toBe(true);
    expect(document.querySelector('[data-pagelet="Stories"]')).toBeNull();
  });

  test("Should return false when no selector is found", () => {
    document.body.innerHTML = "<div>outro conteúdo</div>";

    const result = FacebookStoriesRemover.remove();

    expect(result).toBe(false);
  });

  test("Should remove multiple elements with the same selector", () => {
    document.body.innerHTML = `
      <div data-pagelet="Stories">1</div>
      <div data-pagelet="Stories">2</div>
    `;

    FacebookStoriesRemover.remove();

    expect(document.querySelectorAll('[data-pagelet="Stories"]').length).toBe(
      0,
    );
  });
});
