let pageHelper = require('../../framework/helpers/pageHelper.js');
let BasePage = require('../../framework/basePage');

class SignInForm extends BasePage{
    constructor() {
        super(element(by.id("signup")), "Sign in form");
        this.txdLogin = element(by.id("mailbox:login"));
        this.txdPassword = element(by.id("mailbox:password"));
        this.lblLoginError = element(by.id("mailbox:error"));
        // this.btnLogin = element($('.o-control[type="submit"]'));
        this.btnSubmit = element(by.id("mailbox:submit"));
    }

    typePassword(password) {
        this.txdPassword.sendKeys(password);
    }

    typeLogin(login) {
        this.txdLogin.sendKeys(login);
    }

    clickSubmit() {
        this.btnSubmit.click();
    }

    isErrorHintDisplayed() {
        return pageHelper.waitForIsVisible(this.lblLoginError)
    }
}

module.exports = SignInForm;