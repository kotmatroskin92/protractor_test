let config = require('./config');
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./project/specs/todo-spec.js'],
    capabilities: {
        browserName: config.browserName,
        chromeOptions: {
            args: [
                '--disable-popup-blocking',
                'disable-infobars',
            ]
        },
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: config.jasmineTimeout
    },
    getPageTimeout: config.pageLoadTime,
    // onPrepare: () => {
        // browser.driver.manage().timeouts().implicitlyWait(20000);
        // browser.waitForAngularEnabled(false);
        // browser.manage().window().maximize();
    // }
};