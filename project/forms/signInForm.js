'use strict';
const pageHelper = require('../../framework/helpers/pageHelper');
const BasePage = require('../../framework/basePage');

class SignInForm extends BasePage{
    constructor() {
        super(element(by.id("signup")), "Sign in form");
        this.txdLogin = element(by.id("mailbox:login"));
        this.txdPassword = element(by.id("mailbox:password"));
        this.lblLoginError = element(by.id("mailbox:error"));
        this.btnSubmit = element(by.id("mailbox:submit"));
    }

    typePassword(password) {
        return this.txdPassword.sendKeys(password);
    }

    typeLogin(login) {
        return this.txdLogin.sendKeys(login);
    }

    clickSubmit() {
        return this.btnSubmit.click();
    }

    isErrorHintDisplayed() {
        return pageHelper.waitForIsVisible(this.lblLoginError)
    }
}

module.exports = SignInForm;