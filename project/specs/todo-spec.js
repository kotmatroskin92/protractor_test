let MainPage = require('../pages/mainPage');
let SignInForm = require('../forms/signInForm');
let addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
let envReader = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Invalid password check', function() {

    addSuiteHooks();
    it('Open main page', async function () {
        new MainPage();
    });

    it('Login', async function () {
        logger.logStep('Step. Login with incorrect username and password', () => {
            let signInForm = new SignInForm();
            signInForm.typeLogin(envReader.getValue("@testData.username"));
            signInForm.typePassword(envReader.getValue("@testData.password"));
            signInForm.clickSubmit();
            expect(signInForm.isErrorHintDisplayed()).toEqual(true);
            browser.sleep(2000);
        });
    });
});

