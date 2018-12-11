'use strict';
const MainPage = require('../pages/mainPage');
const InboxPage = require('../pages/inboxPage');
const SignInForm = require('../forms/signInForm');
const ComposeForm = require('../forms/composeForm');
const FolderNavigateForm = require('../forms/folderNavigateForm');
const LetterModel = require('../models/letterModel');
const navFolderEnum = require('../enums/NavFolderEnum');
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
            const composeForm = new ComposeForm();
            composeForm.typeLetter(letter);
            composeForm.saveDraft();
        });
    });

    it('Draft message', async function () {
        logger.logStep('Step. Navigate to draft and check letter data', () => {
            console.log(letter.subject);
            const folderNavigateForm = new FolderNavigateForm();
            folderNavigateForm.navigateTo(navFolderEnum.DRAFT);
            browser.sleep(3000);
        });
    });
});
