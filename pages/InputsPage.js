class InputsPage {
    constructor(page) {
        this.page = page; 

        
        this.numberInputs= page.locator('input[type="number"]');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/inputs');
    }
    async pressNumbers(number) {
        await this.numberInputs.pressSequentially(number)
    }
    async pressArrow(direction) {
        await this.numberInputs.press(direction);
    }
    async clearField() {
        await this.numberInputs.clear();
    }

}

export default InputsPage;