let conditionTime = require('../../config').conditionTime;
const EC = protractor.ExpectedConditions;
const logger = require("../logger.js").logger;

class PageHelper{

    waitForIsVisible(element) {
        return this.waitForCondition(EC.visibilityOf(element), "isDispalayed");
    }

    waitForCondition(condition, msg='', timeout=conditionTime) {
        return browser.wait(condition, timeout).then(function () {
            return true;
        }).catch(function (e) {
            logger.fail(`Element ${msg} condition not found`);
            return false;
        });
    }
}
module.exports = new PageHelper();
