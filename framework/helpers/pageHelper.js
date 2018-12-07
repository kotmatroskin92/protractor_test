const defaultWaitOptions = 1000;
const EC = protractor.ExpectedConditions;
const logger = require("../logger.js").logger;

class PageHelper{
    async getElementBySelector(selector, timeout = defaultWaitOptions) {
        logger.info(`Searching for element ${selector}`);
        const element = $$(`${selector}`).first();
        await browser.wait(EC.presenceOf(element), timeout);
        // await browser.wait(EC.visibilityOf(element), timeout);
        return element
    };

    async waitForSelectorAndClick(selector, timeout = defaultWaitOptions) {
        const element = await this.getElementBySelector(selector, timeout);
        logger.info(`click()`);
        element.click();
        // await browser.wait(EC.elementToBeClickable(element), timeout).then(element.click());
        };

// const waitForXPathAndClick = async (selector, timeout = defaultWaitOptions) => {
//     const elem = element(by.xpath(`${selector}`));
//     await browser.wait(EC.elementToBeClickable(elem), timeout).then(elem.click);};

    waitForIsVisible(selector) {
        return this.waitForCondition(EC.visibilityOf($$(`${selector}`).first()), "isDispalayed")
    }

    waitForCondition(condition, msg='', timeout=defaultWaitOptions) {
        return browser.wait(condition, timeout).then(function () {
            return true;
        }).catch(function (e) {
            logger.fail(`Element ${msg} condition not found`);
            return false;
        });
    }
}
module.exports = new PageHelper();
