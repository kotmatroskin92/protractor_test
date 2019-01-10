'use strict';
const MainPage = require('../pages/mainPage');
const SignInForm = require('../forms/signInForm');
const addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
const { getEnvValue } = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Invalid password check', function() {

    checkInvalidLogin("@testData.login.valid.username", "@testData.login.invalid.password");
    checkInvalidLogin("@testData.login.invalid.username", "@testData.login.invalid.password");

    function checkInvalidLogin(loginPath, passPath) {

        let login = getEnvValue(loginPath);
        let password = getEnvValue(passPath);

        describe(`With login: ${login} and password: ${password}`, function() {

            addSuiteHooks();
            it('Open main page', async function () {
                new MainPage();
            });

            it('Login', async function () {
                logger.logStep('Step. Login with incorrect data', () => {
                    const signInForm = new SignInForm();
                    signInForm.typeLogin(login);
                    signInForm.typePassword(password);
                    signInForm.clickSubmit();
                    expect(signInForm.isErrorHintDisplayed()).toBeTruthy();
                });
            });
        });
    }
});
