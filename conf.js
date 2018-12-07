exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./project/specs/todo-spec.js'],
    onPrepare: () => {
        browser.driver.manage().timeouts().implicitlyWait(20000);
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
    }
};