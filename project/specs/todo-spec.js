'use strict';
const MainPage = require('../pages/mainPage');
const InboxPage = require('../pages/inboxPage');
const SignInForm = require('../forms/signInForm');
const addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
const envReader = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Draft message', function() {

    addSuiteHooks();

    it('Open main page', async function () {
        new MainPage();
    });

    it('Login', async function () {
        logger.logStep('Step. Login with correct data', () => {
            const login = envReader.getValue("@testData.login.valid.username");
            const password = envReader.getValue("@testData.login.valid.password");
            const signInForm = new SignInForm();
            signInForm.typeLogin(login);
            signInForm.typePassword(password);
            signInForm.clickSubmit();
        });
    });

    it('Draft message', async function () {
        logger.logStep('Step. Login with correct data', () => {
            const inboxPage = new InboxPage();
            inboxPage.clickComposeLetter();
            browser.sleep(2000);
        });
    });

});
