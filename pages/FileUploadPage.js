class FileUploadPage {
  constructor(page) {
    this.page = page;

    this.chooseFileInput = page.locator("#file-upload");
    this.uploadButton = page.locator("#file-submit");
    this.uploadedFileName = page.locator("#uploaded-files");
    this.dragDropZone = page.locator("#drag-drop-upload");
    this.dragDropInput = page.locator("input.dz-hidden-input");
    this.successHeader = page.locator("h3");
    this.errorHeader = page.locator("h1");
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/upload");
  }
  async uploadViaButton(filePath) {
    await this.chooseFileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }
  async uploadViaDragAndDrop(filePath) {
    await this.dragDropInput.setInputFiles(filePath);
  }
}

export default FileUploadPage;
