const config = require('./config');
const AllureReporter = require('jasmine-allure-reporter');

let addScreenShots = new function () {
    this.specDone = function (result) {
        if (result.status === "failed") {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
        }
    };
};

exports.config = {
    framework: 'jasmine',
    seleniumAddress: config.seleniumAddress,
    specs: ['./project/specs/todo-spec.js'],
    capabilities: {
        browserName: config.browserName,
        chromeOptions: {
            args: [
                '--disable-popup-blocking',
                '--disable-infobars',
                '--incognito',
            ]
        },
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: config.jasmineTimeout
    },
    getPageTimeout: config.pageLoadTime,
    onPrepare: () => {
        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().addReporter(addScreenShots);
    }
};
