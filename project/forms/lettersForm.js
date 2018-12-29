'use strict';
const BasePage = require("../../framework/basePage");
const pageHelper = require('../../framework/helpers/pageHelper');


class LettersForm extends BasePage{
    constructor() {
        super(element(by.id("b-letters")), "Letters data list form");
    }


    getLetterElement(letter) {
        return element(by.xpath(`//a[contains(@title, '${letter.toEmail}') and @data-subject='${letter.subject}']`));
    }

    isLetterDisplayed(letter) {
        return pageHelper.waitForIsVisible(this.getLetterElement(letter));
    }

    clickLetter(letter) {
        return this.getLetterElement(letter).click();
    }
}

module.exports = LettersForm;