const {Builder, until, Key, By} = require("selenium-webdriver");
require("chromedriver");

class SevenCharValPage {
    constructor(url = "https://testpages.eviltester.com/apps/7-char-val/") {
        this.driver = null;
        this.url = url;
        this.charactersInput = "//*[@name='characters']";
        this.checkButton = "//*[@value='Check Input']";
        this.validationMessage = "//*[@name='validation_message']";
    }

    async open() {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.url);
        console.log(this.url);
    }

    async enterCharacters(chars) {
        const input = await this.driver.findElement(By.xpath(this.charactersInput));
        await input.clear();
        
        // Check if the input contains characters outside the Basic Multilingual Plane (BMP)
        const hasNonBMP = [...chars].some(char => char.codePointAt(0) > 0xFFFF);
        
        if (hasNonBMP) {
            // Use JavaScript to set the value directly for non-BMP characters
            await this.driver.executeScript("arguments[0].value = arguments[1];", input, chars);
        } else {
            // Use sendKeys for BMP characters
            await input.sendKeys(chars);
        }
    }

    async clickCheckInput() {
        await this.driver.findElement(By.xpath(this.checkButton)).click();
    }

    async checkValue(chars) {
        await this.enterCharacters(chars);
        await this.clickCheckInput();
        await this.driver.sleep(100);
    }

    async getValidationMessage() {
        const msgInput = await this.driver.findElement(By.xpath(this.validationMessage));
        return await msgInput.getAttribute("value");
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async sleep(n) {
        await this.driver.sleep(n);
    }

    async close() {
        if (this.driver) {
            await this.driver.quit();
        }
    }
}

module.exports = SevenCharValPage;
