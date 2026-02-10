describe("Popup", () => {
  let facebookCheckboxEl;
  let instagramCheckboxEl;
  let facebookAdsCheckboxEl;
  let getCurrentConfig;
  let handleChangeCheckbox;

  beforeEach(() => {
    jest.resetModules();
    createElement('<input type="checkbox" id="facebook" />');
    createElement('<input type="checkbox" id="instagram" />');
    createElement('<input type="checkbox" id="facebookAds" />');

    facebookCheckboxEl = document.getElementById("facebook");
    instagramCheckboxEl = document.getElementById("instagram");
    facebookAdsCheckboxEl = document.getElementById("facebookAds");

    const Popup = require("../src/modules/popup/popup");

    getCurrentConfig = Popup.getCurrentConfig;
    handleChangeCheckbox = Popup.syncCheckboxesWithState;
  });

  test("Should get current config", () => {
    facebookCheckboxEl.checked = true;
    instagramCheckboxEl.checked = false;
    facebookAdsCheckboxEl.checked = true;
    const config = getCurrentConfig();

    expect(config).toEqual({
      facebookStoriesEnabled: true,
      instagramStoriesEnabled: false,
      facebookAdsEnabled: true,
    });
  });

  test("Should update checkbox state", () => {
    handleChangeCheckbox({
      facebookStoriesEnabled: false,
      instagramStoriesEnabled: true,
      facebookAdsEnabled: false,
    });

    expect(facebookCheckboxEl.checked).toBe(false);
    expect(instagramCheckboxEl.checked).toBe(true);
    expect(facebookAdsCheckboxEl.checked).toBe(false);
  });
});
