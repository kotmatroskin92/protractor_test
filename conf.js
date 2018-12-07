let config = require('./config');
let AllureReporter = require('jasmine-allure-reporter');

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
        jasmine.getEnv().afterAll(function(done) {
            console.log(jasmine.getEnv().currentSpec.results());
            // if (!jasmine.getEnv().currentSpec.results().passed()) {

                browser.takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                        return new Buffer(png, 'base64')
                    }, 'image/png')();
                    done();
                })
            // }
        });
    }
    // browser.driver.manage().timeouts().implicitlyWait(20000);
    // browser.waitForAngularEnabled(false);
        // browser.manage().window().maximize();
    // }
};