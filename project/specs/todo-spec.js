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
const getEnvValue = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Draft message', function() {

    addSuiteHooks();
    const letter = new LetterModel();

    it('Open main page', async function () {
        new MainPage();
    });

    it('Login', async function () {
        logger.logStep('Step. Login with correct data', () => {
            const login = getEnvValue("@testData.login.valid.username");
            const password = getEnvValue("@testData.login.valid.password");
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
            letter.setRndData();
            const composeForm = new ComposeForm();
            composeForm.typeLetter(letter);
            composeForm.saveDraft();
        });
    });

    it('Draft message', async function () {
        logger.logStep('Step. Navigate to draft and check letter', async () => {
            await new FolderNavigateForm().navigateTo(navFolderEnum.DRAFT);
            const lettersForm = new LettersForm();
            expect(lettersForm.isLetterDisplayed(letter)).toEqual(true);
            lettersForm.clickLetter(letter);
        });
    });

    it('Compose message', async function () {
        logger.logStep('Step. Check compose letter data', async () => {
            const composeForm = new ComposeForm();
            expect(await composeForm.getMessageText()).toEqual(letter.message);
            expect(composeForm.getSubject()).toEqual(letter.subject);
            expect(composeForm.getToEmail()).toEqual(letter.getToEmailNoDelimiter());
        });
    });
});
