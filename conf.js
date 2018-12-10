let config = require('./config');
let AllureReporter = require('jasmine-allure-reporter');

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
    onPrepare: () => {
        // jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));
        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().addReporter(addScreenShots);
        // jasmine.getEnv().afterAll(function(done) {
                // browser.takeScreenshot().then(function (png) {
                //     allure.createAttachment('Screenshot', function () {
                //         return new Buffer(png, 'base64')
                //     }, 'image/png')();
                //     done();
                // })
        // });
    }
};