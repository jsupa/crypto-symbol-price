const helpers = require('../lib/helpers');
const _data = require('../lib/data');
const config = require('../lib/config');

const method = {};

const dataFromType = config.dataFrom;

method.get = function (data, callback) {
    if (dataFromType === 'file') {
        _data.exist('', 'coins', (err) => {
            if (!err) {
                _data.read('', 'coins', (err, data) => {
                    if (!err && data) {
                        const output = [];
                        helpers.getPrices((prices) => {
                            data.forEach((coin) => {
                                const x = prices.find(
                                    (el) => el.symbol === `${coin}USDT`,
                                );
                                output.push(x);
                            });
                            callback(200, output, 'json');
                        });
                    } else {
                        console.log(`[ ${helpers.getTime()} ] : ERROR : `, err);
                    }
                });
            } else {
                console.log(`[ ${helpers.getTime()} ] : ERROR : `, err);
            }
        });
    } else {
        helpers.getFromUrl(config.dataUrl, (symbols) => {
            const output = [];
            helpers.getPrices((prices) => {
                symbols.forEach((coin) => {
                    const x = prices.find((el) => el.symbol === `${coin}USDT`);
                    output.push(x);
                });
                callback(200, output, 'json');
            });
        });
    }
};

module.exports = method;
