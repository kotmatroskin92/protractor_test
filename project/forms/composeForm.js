'use strict';
const BasePage = require("../../framework/basePage");

class ComposeForm extends BasePage{
    constructor() {
        super(element(by.id("b-compose")), "Compose letter form ");
        this.txbTo = element(by.xpath("//textarea[@data-original-name='To']"));
        this.txbSubject = element(by.xpath("//input[@name='Subject']"));
        this.txbMessage = element(by.id("tinymce"));
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

    getToEmail() {
        let email = '';
        this.txbSubject.getText().then(function (text) {
            email = text;
        });
        return email
    }

    getSubject() {
        return this.txbSubject.getText().then(function (text) {
            return text;
        });
    }
}

module.exports = ComposeForm;