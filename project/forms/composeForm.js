'use strict';
const BasePage = require("../../framework/basePage");
const pageHelper = require('../../framework/helpers/pageHelper');


class ComposeForm extends BasePage{
    constructor() {
        super(element(by.id("b-compose")), "Compose letter form");
        this.txbTo = element(by.xpath("//textarea[@data-original-name='To']"));
        this.txbSubject = element(by.xpath("//input[@name='Subject']"));
        this.txbMessage = element(by.id("tinymce"));
        this.btnSaveDraft = element(by.xpath("//div[contains(@id,'toolbar')]//div[@data-name='saveDraft']"));
        this.lblSaveStatus = element(by.xpath("//div[@data-mnemo='saveStatus']//span[@class='time']"));
    }


    typeInTo(email) {
        this.txbTo.sendKeys(email);
    }

    typeInSubject(subject) {
        this.txbSubject.sendKeys(subject);
    }

    typeInMessage(text) {
        this.txbMessage.sendKeys(text);
    }

    typeLetter(letter) {
        this.typeInTo(letter.toEmail);
        this.typeInSubject(letter.subject);
        // this.typeInMessage(letter.message);
    }

    saveDraft() {
        this.btnSaveDraft.click();
        pageHelper.waitForIsVisible(this.lblSaveStatus)
    }
}

module.exports = ComposeForm;