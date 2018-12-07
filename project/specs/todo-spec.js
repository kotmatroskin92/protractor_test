let MainPage = require('../pages/mainPage');
let SignInForm = require('../forms/signInForm');
let addSuiteHooks = require('../../framework/hooks').addSuiteHooks;


describe('Invalid password check', function() {

    addSuiteHooks();
    it('Open main page', async function () {
        // browser.get('https://mail.ru/');
        new MainPage();
    });

    it('Login', async function () {
        let signInForm = new SignInForm();
        signInForm.typeLogin("53adminmail");
        signInForm.typePassword("1");
        signInForm.clickSubmit();
        expect(signInForm.isErrorHintDisplayed()).toEqual(true);
        browser.sleep(2000);
    });
});
