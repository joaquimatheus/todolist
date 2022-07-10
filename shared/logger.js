const util = require("util");

const ts = () => `${new Date().toLocaleString()} ~ `;
const output = (msg) => (typeof msg === "string" ? msg : util.inspect(msg));

const isTTYout = Boolean(process.stdout.isTTY);
const isTTYerr = Boolean(process.stderr.isTTY);

const labelInfo = isTTYout ? "\x1b[32m{info}\x1b[0m" : "";
const labelError = isTTYerr ? "\x1b[31m!error!\x1b[0m" : "";

class Logger {
    formatError(error) {
        let errorData = {};

        if (error instanceof Error) {
            errorData = {
                message: error.message,
                stack: error.stack,
            };
        } else {
            const message = output(error);
            errorData = { message, stack: new Error(message).stack };
        }

        return errorData;
    }

    info(msg, context) {
        const params = [labelInfo + ts() + output(msg)];

        if (context) {
            params.push(util.inspect(context));
        }

        params.push('\n');
        process.stdout.write(params.join(""));
    }

    errorFn(error, context) {
        let { message, stack } = formatError(error);

        message = labelError + ts() + message;
        const params = [message, stack];

        if (context) {
            params.push(util.inspect(context));
        }

        params.push("");
        process.stderr.write(params.join(""));
    }
}

function formatError(error) {
    let errorData = {};

    if (error instanceof Error) {
        errorData = {
            message: error.message,
            stack: error.stack,
        };
    } else {
        const message = output(error);
        errorData = { message, stack: new Error(message).stack };
    }

    return errorData;
}

function info(msg, context) {
    const params = [labelInfo + ts() + output(msg)];

    if (context) {
        params.push(util.inspect(context));
    }

    process.stdout.write(params.join(""));
}

function errorFn(error, context) {
    let { message, stack } = formatError(error);

    message = labelError + ts() + message;
    const params = [message, stack];

    if (context) {
        params.push(util.inspect(context));
    }

    params.push("\n");
    process.stderr.write(params.join(""));
}

module.exports = Logger;
