describe("Popup", () => {
  let facebookCheckboxEl;
  let instagramCheckboxEl;
  let getCurrentConfig;
  let handleChangeCheckbox;

  beforeEach(() => {
    jest.resetModules();
    createElement('<input type="checkbox" id="facebook" />');
    createElement('<input type="checkbox" id="instagram" />');

    facebookCheckboxEl = document.getElementById("facebook");
    instagramCheckboxEl = document.getElementById("instagram");

    const Popup = require("../src/modules/popup/popup");

    getCurrentConfig = Popup.getCurrentConfig;
    handleChangeCheckbox = Popup.syncCheckboxesWithState;
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
