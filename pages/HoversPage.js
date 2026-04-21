class HoversPage {
  constructor(page) {
    this.page = page;

    this.userCards = page.locator(".figure");
    this.userNames = page.locator(".figcaption h5");
    this.viewProfileLinks = page.locator(".figcaption a");
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/hovers");
  }
  async hoverOverUser(index) {
    await this.userCards.nth(index).hover();
  }
  async clickViewProfile(index) {
    await this.viewProfileLinks.nth(index).click();
  }
}

export default HoversPage;
