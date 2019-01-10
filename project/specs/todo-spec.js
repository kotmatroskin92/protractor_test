'use strict';
const MainPage = require('../pages/mainPage');
const InboxPage = require('../pages/inboxPage');
const SignInForm = require('../forms/signInForm');
const ComposeForm = require('../forms/composeForm');
const FolderNavigateForm = require('../forms/folderNavigateForm');
const LettersForm = require('../forms/lettersForm');
const LetterModel = require('../models/letterModel');
const navFolderEnum = require('../enums/NavFolderEnum');
const addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
const { getEnvValue } = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Draft message', function() {

    addSuiteHooks();
    const letter = new LetterModel();
    let lettersForm = undefined;
    let composeForm = undefined;

    it('Open main page', async function () {
        new MainPage();
    });

    it('Login', async function () {
        logger.logStep('Step1. Login with correct data', async () => {
            const login = getEnvValue("@testData.login.valid.username");
            const password = getEnvValue("@testData.login.valid.password");
            const signInForm = new SignInForm();
            await signInForm.typeLogin(login);
            await signInForm.typePassword(password);
            await signInForm.clickSubmit();
        });
    });

    it('Compose message', async function () {
        logger.logStep('Step2. Compose and fill letter', async () => {
            const inboxPage = new InboxPage();
            await inboxPage.clickComposeLetter();
            letter.setRndData();
            composeForm = new ComposeForm();
            await composeForm.typeLetter(letter);
        });
    });

    it('Save to draft message', async function () {
        logger.logStep('Step3. Save to draft', async () => {
            await composeForm.saveDraft();
            await expect(composeForm.isLetterSaveToDraft()).toBeTruthy();
        });
    });

    it('Check draft', async function () {
        logger.logStep('Step4. Navigate to draft and assert letter is exist', async () => {
            await new FolderNavigateForm().navigateTo(navFolderEnum.DRAFT);
            lettersForm = new LettersForm();
            await expect(lettersForm.isLetterDisplayed(letter)).toBeTruthy();
        });
    });

    it('Check message', async function () {
        logger.logStep('Step5. Check compose letter data', async () => {
            await lettersForm.clickLetter(letter);
            const composeForm = new ComposeForm();
            await expect(composeForm.getMessageText()).toEqual(letter.message);
            await expect(composeForm.getSubject()).toEqual(letter.subject);
            await expect(composeForm.getToEmail()).toEqual(letter.getToEmailNoDelimiter());
        });
    });
});
