class DropdownPage {
    constructor(page) {
        this.page = page;

        this.dropdownField = page.locator('#dropdown');
        this.optionOne = this.dropdownField.locator('option[value="1"]');
        this.optionTwo = this.dropdownField.locator('option[value="2"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/dropdown');
    }

    async chooseOption(value) {
        await this.dropdownField.selectOption(value);
    }

}

export default DropdownPage;