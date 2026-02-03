const { createElement, elements } = require("../src/utils/utils");
const {
  getCurrentConfig,
  handleChangeCheckbox,
} = require("../src/modules/popup/popup");

describe("Popup", () => {
  let facebookCheckboxEl;
  let instagramCheckboxEl;

  beforeEach(() => {
    createElement('<input type="checkbox" id="facebook" />');
    createElement('<input type="checkbox" id="instagram" />');

    facebookCheckboxEl = elements.facebook;
    instagramCheckboxEl = elements.instagram;

    jest.resetModules();
  });

  test("Should get current config", () => {
    facebookCheckboxEl.checked = true;
    instagramCheckboxEl.checked = false;
    const config = getCurrentConfig();

    expect(config).toEqual({
      facebookStoriesEnabled: true,
      instagramStoriesEnabled: false,
    });
  });

  test("Should update checkbox state", () => {
    handleChangeCheckbox({
      facebookStoriesEnabled: false,
      instagramStoriesEnabled: true,
    });

    expect(facebookCheckboxEl.checked).toBe(false);
    expect(instagramCheckboxEl.checked).toBe(true);
  });
});
