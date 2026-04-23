class FramesPage {
  constructor(page) {
    this.page = page;

    this.editorFrame = page.frameLocator("#mce_0_ifr");
    this.textArea = this.editorFrame.locator("#tinymce");
    this.header = page.locator("h3");
    this.closeAlertButton = page.getByRole('button', { name: 'Close' });
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/iframe");
    if (await this.closeAlertButton .isVisible()) {
    await this.closeAlertButton.click();
    }

  }

  async clearAndWrite(message) {
    await this.textArea.evaluate(el => el.setAttribute('contenteditable', 'true'));
    await this.textArea.click({ force: true });
    await this.textArea.fill(message);
  }
}

export default FramesPage;
