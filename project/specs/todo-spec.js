'use strict';
let MainPage = require('../pages/mainPage');
let SignInForm = require('../forms/signInForm');
let addSuiteHooks = require('../../framework/hooks').addSuiteHooks;
let envReader = require('../../framework/helpers/envReader');
const logger = require("../../framework/logger");


describe('Invalid password check', function() {

    checkInvalidLogin("@testData.login.valid.username", "@testData.login.invalid.password");
    checkInvalidLogin("@testData.login.invalid.username", "@testData.login.invalid.password");

    function checkInvalidLogin(loginPath, passPath) {

        let login = envReader.getValue(loginPath);
        let password = envReader.getValue(passPath);

        describe(`With login: ${login} and password: ${password}`, function() {

            addSuiteHooks();
            it('Open main page', async function () {
                new MainPage();
            });

            it('Login', async function () {
                logger.logStep('Step. Login with incorrect data', () => {
                    let signInForm = new SignInForm();
                    signInForm.typeLogin(login);
                    signInForm.typePassword(password);
                    signInForm.clickSubmit();
                    expect(signInForm.isErrorHintDisplayed()).toEqual(true);
                    browser.sleep(1500);
                });
            });
        });
    }
});

