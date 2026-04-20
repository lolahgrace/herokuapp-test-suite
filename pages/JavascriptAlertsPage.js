class JavascriptAlertsPage{
    constructor(page) {
        this.page = page;

        this.jsAlertBtn = page.locator('button[onclick="jsAlert()"]');
        this.jsConfirmBtn = page.locator('button[onclick="jsConfirm()"]');
        this.jsPromptBtn = page.locator('button[onclick="jsPrompt()"]');
        this.resultText = page.locator('#result');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    }

    async clickAlert(){
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.jsAlertBtn.click();
    }
    async clickConfirmOk() {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.jsConfirmBtn.click();
    }
    async clickConfirmCancel() {
        this.page.on('dialog', async (dialog) => {
            await dialog.dismiss();
        });
        await this.jsConfirmBtn.click();
    }
    async clickPromptOk(text) {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept(text);
        });
        await this.jsPromptBtn.click();
    }
    async clickPromptCancel() {
        this.page.on('dialog', async (dialog) => {
            await dialog.dismiss();
        });
        await this.jsPromptBtn.click();
    }
    
}

export default JavascriptAlertsPage;