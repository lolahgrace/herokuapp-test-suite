class CheckboxPage {
  constructor(page) {
    this.page = page;

    this.checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    this.checkbox2 = page.locator('input[type="checkbox"]').nth(1);
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/checkboxes");
  }

  async setCheckbox(checkbox, state) {
    await checkbox.setChecked(state);
  }
}

export default CheckboxPage;
