'use strict';
const {createLogger, format, transports, addColors} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const customLevels = {
    levels: {
        fail: 0,
        start: 1,
        info: 2,
        finish: 3
    },
    colors: {
        fail: 'red',
        start: 'yellow',
        info: 'white',
        finish: 'green'
    }
};

const AllureStatus = {
    PASSED: "Passed",
    FAILED: "Failed"
};

addColors(customLevels.colors);

class Logger {
    constructor() {
        this.logger = createLogger({
            levels: customLevels.levels,
            transports: [
                new transports.Console({
                    format: combine(
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.colorize({
                            all: true
                        }),
                        myFormat
                    ),
                    level: "finish"
                }),
                new transports.File({filename: 'combined.log', format: format.simple(), level: "finish"})
            ]
        });
    }

    logMessage(messageText, status = AllureStatus.PASSED) {
        allure._allure.startStep(messageText);
        allure._allure.endStep(status);
    }

    logPromise(promise, message) {
        return promise
            .then(function (res) {
                Logger.logMessage(message);
                return res;
            })
            .catch(function (error) {
                Logger.logMessage(message, AllureStatus.FAILED);
                throw error;
            })
    }

    async logStep(messageText, func, status = AllureStatus.PASSED) {
        allure._allure.startStep(messageText);
        await func();
        allure._allure.endStep(status);
    }
}

module.exports = new Logger();