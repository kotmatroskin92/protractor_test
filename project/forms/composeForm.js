'use strict';
const BasePage = require("../../framework/basePage");

class ComposeForm extends BasePage{
    constructor() {
        super(element(by.id("b-compose")), "Compose letter form ");
        this.txbTo = element(by.xpath("//textarea[@data-original-name='To']"));
        this.txbSubject = element(by.xpath("//input[@name='Subject']"));
        this.txbMessage = element(by.id("tinymce"));
        this.btnSaveDraft = element(by.xpath("//div[contains(@id,'toolbar')]//div[@data-name='saveDraft']"));
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

    clickSaveDraft() {
        this.btnSaveDraft.click();
    }
}

module.exports = ComposeForm;