const moment = require('moment');
const request = require('request');

const helpers = {};

helpers.parseJsonToObject = (string) => {
    try {
        const obj = JSON.parse(string);
        return obj;
    } catch (e) {
        return {};
    }
};

helpers.getTime = () => {
    const result = moment().format('MMMM Do YYYY - H:mm:ss');
    return result;
};

helpers.getTimestamp = () => {
    const result = moment().format('x');
    return parseInt(result, 10);
};

helpers.getMinutes = () => {
    const result = moment().format('mm');
    return parseInt(result, 10);
};

helpers.getPrices = async (callback) => {
    await request(
        'https://api.binance.com/api/v3/ticker/price',
        (error, response) => {
            if (error) throw new Error(error);
            const cryptoData = JSON.parse(response.body);
            callback(cryptoData);
        },
    );
};

helpers.getFromUrl = async (url, callback) => {
    await request(url, (error, response) => {
        if (error) throw new Error(error);
        const symbolsData = JSON.parse(response.body);
        callback(symbolsData);
    });
};

module.exports = helpers;
