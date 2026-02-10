describe("FacebookAds", () => {
  test("Should remove element when selector is found", () => {
    createElement(
      '<div data-visualcompletion="ignore-late-mutation">Sponsored Ad</div>',
    );

    const adsRemoved = Facebook.removeAdsFromDom();

    expect(adsRemoved).toBe(true);
    expect(
      document.querySelector('[data-visualcompletion="ignore-late-mutation"]'),
    ).toBeNull();
  });

  test("Should return false when no selector is found", () => {
    createElement("<div>Organic content</div>");

    const adsRemoved = Facebook.removeAdsFromDom();

    expect(adsRemoved).toBe(false);
  });

  test("Should remove multiple elements with the same selector", () => {
    createElement(`
      <div data-visualcompletion="ignore-late-mutation">Ad 1</div>
      <div data-visualcompletion="ignore-late-mutation">Ad 2</div>
    `);

    Facebook.removeAdsFromDom();

    expect(
      document.querySelectorAll(
        '[data-visualcompletion="ignore-late-mutation"]',
      ).length,
    ).toBe(0);
  });
});
