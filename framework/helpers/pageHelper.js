const defaultWaitOptions = 1000;
const EC = protractor.ExpectedConditions;

class PageHelper{
    async getElementBySelector(selector, timeout = defaultWaitOptions) {
        const element = $$(`${selector}`).first();
        await browser.wait(EC.presenceOf(element), timeout);
        // await browser.wait(EC.visibilityOf(element), timeout);
        return element
    };

    async waitForSelectorAndClick(selector, timeout = defaultWaitOptions) {
        const element = await this.getElementBySelector(selector, timeout);
        element.click();
        // await browser.wait(EC.elementToBeClickable(element), timeout).then(element.click());
        };

// const waitForXPathAndClick = async (selector, timeout = defaultWaitOptions) => {
//     const elem = element(by.xpath(`${selector}`));
//     await browser.wait(EC.elementToBeClickable(elem), timeout).then(elem.click);};

    waitForIsVisible(selector) {
        return this.waitForCondition(EC.visibilityOf($$(`${selector}`).first()), "isDispalayed")
    }

    waitForCondition(condition, msg='', timeout=2000) {
        return browser.wait(condition, timeout).then(function () {
            return true;
        }).catch(function (e) {
            console.log("element " + msg + " condition not found");
            return false;
        });
    }
}
module.exports = new PageHelper();
