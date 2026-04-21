class DynamicLoadingPage {
  constructor(page) {
    this.page = page;

    this.startButton = page.locator("#start button");
    this.loadingBar = page.locator("#loading");
    this.finishText = page.locator("#finish h4");
  }

  async goto(exampleNumber) {
    await this.page.goto(
      `https://the-internet.herokuapp.com/dynamic_loading/${exampleNumber}`,
    );
  }
  async clickStart() {
    await this.startButton.click();
    await this.loadingBar.waitFor({ state: "hidden", timeout: 10000 });
  }
}

export default DynamicLoadingPage;
