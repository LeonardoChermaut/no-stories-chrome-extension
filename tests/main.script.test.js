describe("Content Script", () => {
  test("Should return true for facebook.com", () =>
    expect(Facebook.isFacebookDomain({ hostname: Facebook.hostname })).toBe(
      true,
    ));

  test("Should return true for instagram.com", () =>
    expect(Instagram.isInstagramDomain({ hostname: Instagram.hostname })).toBe(
      true,
    ));
});
