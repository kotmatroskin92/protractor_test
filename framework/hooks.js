'use strict';
const config = require('../config');
const { getStartUrl } = require('./helpers/envReader');
const pageHelper = require('./helpers/pageHelper');

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
                    return browser.waitForAngularEnabled(config.isWaitForAngular)
                }).then((function () {
                    return browser.driver.manage().timeouts().implicitlyWait(config.implicitlyWait);
            }))
                .then(function () {
                    return pageHelper.navigateTo(getStartUrl());
                });
        });
    }
};