class DynamicControlsPage {
  constructor(page) {
    this.page = page;

    this.checkbox = page.locator("#checkbox");
    this.removeAddBtn = page.locator('button[onclick="swapCheckbox()"]');
    this.inputField = page.locator('input[type="text"]');
    this.enableDisableBtn = page.locator('button[onclick="swapInput()"]');
    this.resultMessage = page.locator("#message");
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/dynamic_controls");
  }
  async toggleCheckbox() {
    await this.removeAddBtn.click();
    await this.resultMessage.waitFor({ state: "visible" });
  }
  async toggleInput() {
    await this.enableDisableBtn.click();
    await this.resultMessage.waitFor({ state: "visible" });
  }
}

export default DynamicControlsPage;
