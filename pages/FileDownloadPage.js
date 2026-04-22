class FileDownloadPage {
  constructor(page) {
    this.page = page;

    this.firstDownloadLink = page.locator(".example a").first();
  }
  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/download");
  }
  async downloadFirstFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.firstDownloadLink.click(),
    ]);
    return download;
  }
}

export default FileDownloadPage;
