'use strict';
const BasePage = require("../../framework/basePage");
const pageHelper = require('../../framework/helpers/pageHelper');

class ComposeForm extends BasePage{
    constructor() {
        super($("#b-compose"), "Compose letter form");
        this.txbTo = $("textarea[data-original-name='To']");
        this.lblTo = $("#compose_to");
        this.txbSubject = $("input[name='Subject']");
        this.txbMessage = $("#tinymce");
        this.btnSaveDraft = $("[id*='toolbar'] [data-name='saveDraft']");
        this.lblSaveStatus = $$("[data-mnemo='saveStatus'] .time").first();
        this.iFrameComposeEditor = $("iframe[id*='composeEditor_ifr']");
    }

    typeInTo(email) {
        return this.txbTo.sendKeys(email);
    }

    typeInSubject(subject) {
        return this.txbSubject.clear().sendKeys(subject);
     }

    typeInMessage(text) {
        pageHelper.doActionInFrame(this.iFrameComposeEditor, function() {
            return this.txbMessage.clear().sendKeys(text);
        }.bind(this))
    }

    getMessageText() {
        return pageHelper.doActionInFrame(this.iFrameComposeEditor, function() {
            return this.txbMessage.getText();
        }.bind(this));
    }

    getSubject() {
        return this.txbSubject.getAttribute('value')
    }

    async getToEmail() {
        const val = await this.lblTo.getAttribute('value');
        return val.replace(',', '');
    }

    async typeLetter(letter) {
        await this.typeInTo(letter.toEmail);
        await this.typeInSubject(letter.subject);
        this.typeInMessage(letter.message);
    }

    saveDraft() {
        return this.btnSaveDraft.click();
    }

    isLetterSaveToDraft() {
        return pageHelper.waitForIsVisible(this.lblSaveStatus)
    }
}

module.exports = ComposeForm;