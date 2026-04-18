class AddRemoveElementsPage {
    constructor(page) {
        this.page = page;

        this.addButton = page.locator('button[onclick="addElement()"]');
        this.deleteButtons = page.locator('.added-manually');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    }

    async addElements(count) {
        for(let i=0; i < count; i++){
            await this.addButton.click();
        }
    }
    async deleteElements(count) {
        for(let i=0; i<count; i++){
            await this.deleteButtons.first().click();
        }
    }

}

export default AddRemoveElementsPage;