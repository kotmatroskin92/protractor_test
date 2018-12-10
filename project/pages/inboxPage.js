'use strict';
const BasePage = require('../../framework/basePage');

class InboxPage extends BasePage{
    constructor() {
        super(element(by.id("signup")), "Inbox page");
        this.btnCompose = element(by.xpath("//div[@id='b-toolbar__left']//a[@data-name='compose']"));
    }

    clickComposeLetter() {
        this.btnCompose.click()
    }
}

module.exports = InboxPage;