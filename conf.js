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
    specs: ['./project/specs/todo-spec.js', './project/specs/login-spec.js'],
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
        //skip tests after first fail
        let specs = [];
        let orgSpecFilter = jasmine.getEnv().specFilter;
        jasmine.getEnv().specFilter = function (spec) {
            specs.push(spec);
            return orgSpecFilter(spec);
        };
        jasmine.getEnv().addReporter(new function () {
            this.specDone = function (result) {
                if (result.failedExpectations.length > 0) {
                    specs.forEach(function (spec) {
                        spec.disable()
                    });
                }
            };
        });
    },
};