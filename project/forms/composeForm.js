'use strict';
const BasePage = require("../../framework/basePage");
const pageHelper = require('../../framework/helpers/pageHelper');


class ComposeForm extends BasePage{
    constructor() {
        super(element(by.id("b-compose")), "Compose letter form");
        this.txbTo = element(by.xpath("//textarea[@data-original-name='To']"));
        this.lblTo = element(by.id("compose_to"));
        this.txbSubject = element(by.xpath("//input[@name='Subject']"));
        this.txbMessage = element(by.id("tinymce"));
        this.btnSaveDraft = element(by.xpath("//div[contains(@id,'toolbar')]//div[@data-name='saveDraft']"));
        this.lblSaveStatus = element(by.xpath("//div[@data-mnemo='saveStatus']//span[@class='time']"));
        this.iFrameComposeEditor = element(by.xpath("//iframe[contains(@id, 'composeEditor_ifr')]"));
    }

    typeInTo(email) {
        this.txbTo.sendKeys(email);
    }

    typeInSubject(subject) {
        this.txbSubject.clear().sendKeys(subject);
     }

    typeInMessage(text) {
        pageHelper.doActionInFrame(this.iFrameComposeEditor, function() {
            this.txbMessage.clear().sendKeys(text);
        }.bind(this))
    }

    async getMessageText() {
        await pageHelper.switchToFrameByElement(this.iFrameComposeEditor);
        const text = await this.txbMessage.getText();
        await pageHelper.switchToDefaultContent();
        return text;
    }

    async getSubject() {
        return await this.txbSubject.getAttribute('value')
    }

    async getToEmail() {
        return await this.lblTo.getAttribute('value')
    }

    typeLetter(letter) {
        this.typeInTo(letter.toEmail);
        this.typeInSubject(letter.subject);
        this.typeInMessage(letter.message);
    }

    saveDraft() {
        this.btnSaveDraft.click();
        pageHelper.waitForIsVisible(this.lblSaveStatus)
    }
}

module.exports = ComposeForm;