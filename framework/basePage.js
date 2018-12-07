const EC = protractor.ExpectedConditions;
const logger = require("./logger.js").logger;
let conditionTime = require('../config').conditionTime;

class BasePage {

    constructor(element, pageName) {
        this.element = element;
        this.pageName = pageName;

        browser.wait(EC.presenceOf(this.element), conditionTime).then(function () {
            logger.info(`${pageName} was opened`);
        }).catch(function (e) {
            logger.fail(`${pageName} locator ${this.element} was not found`);
            throw error;
        });
    }
}

module.exports = BasePage;