describe("Popup Config", () => {
  let popup;

  beforeEach(() => {
    document.body.innerHTML = `
      <input type="checkbox" id="facebook" />
      <input type="checkbox" id="instagram" />
    `;
    jest.resetModules();
    popup = require("../src/popup/popup");
  });

  test("Should get current config", () => {
    const facebookCheckboxEl = document.getElementById("facebook");
    const instagramCheckboxEl = document.getElementById("instagram");

    facebookCheckboxEl.checked = true;
    instagramCheckboxEl.checked = false;
    const config = popup.getCurrentConfig();

    expect(config).toEqual({ facebook: true, instagram: false });
  });

  test("Should update UI", () => {
    popup.updateUI({ facebook: false, instagram: true });

    expect(document.getElementById("facebook").checked).toBe(false);
    expect(document.getElementById("instagram").checked).toBe(true);
  });
});
