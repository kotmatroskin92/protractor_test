'use strict';
const EC = protractor.ExpectedConditions;
const logger = require("./logger").logger;
const conditionTime = require('../config').conditionTime;

class BasePage {

    constructor(element, pageName) {
        this.element = element;
        browser.wait(EC.presenceOf(this.element), conditionTime).then(() => {
            logger.info(`${pageName} was opened`);
        }).catch((e) => {
            logger.fail(`${pageName} locator ${this.element} was not found. ${e}`);
            throw error;
        });
    }
}
module.exports = BasePage;