const Page = require('./Page');
require("chromedriver");
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const safari = require('selenium-webdriver/safari');
const {Builder, Browser} = require('selenium-webdriver');
const { platform } = require('node:process');



class chromePage extends Page {
    constructor(url) {
        super(url);
        this.browser  = "chrome";
    }

    async open() {
            const options = new chrome.Options();
            options.addArguments("--force-device-scale-factor=0.75");
            this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            await this.driver.get(this.url);
    }
}


class firefoxPage extends Page {
    constructor(url) {
        super(url);
        this.browser = "firefox";
    }

    async open() {
        console.log(`This platform is ${platform}`)
        let options = new firefox.Options();
        options.setPreference('layout.css.devPixelsPerPx', '0.7');
        
        if(platform == 'win32'){
            // geckodriver.exe is stored at repo root; find it relative to this file so it works regardless of cwd
            const path = require('path');
            const geckoPath = path.join(__dirname, '..', '..', 'geckodriver.exe');
            const service = new firefox.ServiceBuilder(geckoPath);
            this.driver = await new Builder().forBrowser('firefox').setFirefoxService(service).setFirefoxOptions(options).build();
        }else{
            this.driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        }
        await this.driver.get(this.url);
        await this.driver.executeScript(`
            document.body.style.transform = "scale(0.75)";
            document.body.style.transformOrigin = "0 0";
            document.documentElement.style.width = (100 / 0.75) + "%";
        `);
    }
}


class edgePage extends Page {
    constructor(url) {
        super(url);
        this.browser = "edge";
    }

    async open() {
        let options = new edge.Options();
        options.addArguments("--force-device-scale-factor=0.75");
        this.driver = new Builder().forBrowser(Browser.EDGE).setEdgeOptions(options).build();
        await this.driver.get(this.url);
    }
}

class safariPage extends Page {
    constructor(url) {
        super(url);
        this.browser = "safari";
    }

    async open() {
        this.driver = new Builder().forBrowser(Browser.SAFARI).build();
        await this.driver.get(this.url);
        const scaleFactor = 0.75;
        await this.driver.executeScript(`document.body.style.zoom = ${scaleFactor}`);
    }
}
module.exports = {chromePage, firefoxPage, edgePage, safariPage};