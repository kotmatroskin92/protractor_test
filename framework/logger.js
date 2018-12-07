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
}

module.exports = new Logger();