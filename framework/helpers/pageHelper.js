'use strict';
const conditionTime = require('../../config').conditionTime;
const EC = protractor.ExpectedConditions;
const logger = require("../logger.js").logger;

class PageHelper{

    navigateTo(url) {
        logger.info(`Navigate to: ${url}`);
        return browser.get(url);
    }

    waitForIsVisible(element) {
        return this.waitForCondition(EC.visibilityOf(element), `${element.locator().value} isDispalayed`);
    }

    waitForCondition(condition, msg='', timeout=conditionTime) {
        return browser.wait(condition, timeout).then(() => { return true }).catch((e) => {
            logger.fail(`Element ${msg} condition not found`);
            return false;
        });
    }

    switchToFrameByElement(element) {
        return browser.switchTo().frame(element.getWebElement());
    }

    switchToDefaultContent() {
        return browser.switchTo().defaultContent();
    }

    doActionInFrame(element, callback) {
        this.switchToFrameByElement(element);
        callback();
        this.switchToDefaultContent()
    }
}
module.exports = new PageHelper();