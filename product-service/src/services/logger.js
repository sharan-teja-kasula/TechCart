require('winston-daily-rotate-file');

const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf } = format;

const errorLogFormat = printf(({ level, message, timestamp, params, query, body, files, error }) => {
    let logMessage = `${timestamp} ${level}: ${message}`;

    if (typeof params == 'object' && Object.keys(params).length)
        logMessage += `\n\tParams: ${JSON.stringify(params)}`

    if (typeof query == 'object' && Object.keys(query).length)
        logMessage += `\n\tQuery: ${JSON.stringify(query)}`

    if (typeof body == 'object' && Object.keys(body).length)
        logMessage += `\n\tBody: ${JSON.stringify(body)}`

    if (typeof files == 'object' && Object.keys(files).length)
        logMessage += `\n\tFiles: ${JSON.stringify(files)}`

    if (error) {
        const { message, code } = error;
        logMessage += `\n\tError: ${message} | Code: ${code}`;
    }

    return logMessage
});

const that = {}

that.errorLogger = createLogger({
    format: combine(
        timestamp(),
        errorLogFormat
    ),
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: 'logs/errors/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        })
    ]
});

that.logError = (file, route, method, req, err) => {
    const info = `
    File: ${file}
    Route: ${route}
    Method: ${method}`
    that.errorLogger.error(`${info}`, {
        ...(req?.params && { params: req.params }),
        ...(req?.query && { query: req.query }),
        ...(req?.body && { body: req.body }),
        ...(req?.files && { body: req.files }),
        ...(err && { error: err })
    });
}

module.exports = that;
