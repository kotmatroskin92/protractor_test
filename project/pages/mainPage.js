'use strict';
const BasePage = require('../../framework/basePage');

class MainPage extends BasePage{
    constructor() {
        super(element(by.id("signup")), "Sign in main page");
    }
}

module.exports = MainPage;