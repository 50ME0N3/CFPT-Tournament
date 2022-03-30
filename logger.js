const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Zurich'
    });
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        format.timestamp({ format: timezoned }),
        myFormat
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: __dirname + '/error.log', level: 'error' }),
        new transports.File({ filename: __dirname + '/combined.log' }),
    ],
});

exports.logger = logger;
