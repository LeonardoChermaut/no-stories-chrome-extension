const facebook = require("../src/modules/facebook");

const { createElement } = require("../src/utils/utils");

describe("Facebook", () => {
  beforeEach(() => (document.body.innerHTML = ""));

  test("Should remove element when selector is found", () => {
    createElement('<div data-pagelet="Stories">content</div>');

    const result = facebook.removeStoriesHtmlElement();

    expect(result).toBe(true);
    expect(document.querySelector('[data-pagelet="Stories"]')).toBeNull();
  });

  test("Should return false when no selector is found", () => {
    createElement("<div>outro conteúdo</div>");

    const result = facebook.removeStoriesHtmlElement();

    expect(result).toBe(false);
  });

  test("Should remove multiple elements with the same selector", () => {
    createElement(`
      <div data-pagelet="Stories">1</div>
      <div data-pagelet="Stories">2</div>
    `);

    facebook.removeStoriesHtmlElement();

    expect(document.querySelectorAll('[data-pagelet="Stories"]').length).toBe(
      0,
    );
  });
});
