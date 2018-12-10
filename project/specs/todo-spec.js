'use strict';
const MainPage = require('../pages/mainPage');
const InboxPage = require('../pages/inboxPage');
const SignInForm = require('../forms/signInForm');
const LetterModel = require('../models/letterModel');
const addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
const envReader = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Draft message', function() {

    addSuiteHooks();
    const letter = new LetterModel();


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

    it('Compose message', async function () {
        logger.logStep('Step. Compose and fill letter', () => {
            const inboxPage = new InboxPage();
            inboxPage.clickComposeLetter();
            letter.setRndMessage();
        });
    });

    it('Draft message', async function () {
        logger.logStep('Step. Draft and check letter data', () => {
            console.log(letter.subject);
            browser.sleep(2000);

        });
    });

});
