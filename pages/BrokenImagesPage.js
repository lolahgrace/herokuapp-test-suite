class BrokenImagesPage {
    constructor(page) {
        this.page = page;

        this.allImages = page.locator('.example img')
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/broken_images');
    }
    async isImageBroken(index) {
        return await this.allImages.nth(index).evaluate((img) => {
            return !img.complete || img.naturalWidth === 0;
        });
    }
}

export default BrokenImagesPage;