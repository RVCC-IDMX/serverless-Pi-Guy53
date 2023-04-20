const chalk = require('chalk');
const { DateTime } = require('luxon');

exports.handler = async function () {
    const date = DateTime.now();
    console.log(chalk.bgWhite(`${date}: Hello world Serverless function`));

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!'
        })
    }
}