let config = require('../config');

let isFirst = true;

module.exports = {
    addSuiteHooks: function() {
        beforeAll(function() {
            if (!isFirst) {
                browser.restart()
                    .then(function () {
                        return browser.manage().window().maximize();
                    })
            }
            browser.manage().window().maximize()
                .then(function () {
                    isFirst = false;
                    return browser.waitForAngularEnabled(false)
                }).then((function () {
                    return browser.driver.manage().timeouts().implicitlyWait(20000);
            }))
                .then(function () {
                    return browser.get(config.startUrl);
                });
        });
    }
};