const getSymbolPrice = require('../modules/getSymbolPrice');

const handlers = {};

handlers.index = function (data, callback) {
    if (data.method === 'get') {
        callback(
            200,
            {
                name: 'crypto symbol price',
                creator: 'https://git.io/jakub',
                repo: 'https://github.com/jsupa/crypto-symbol-price',
            },
            'json',
        );
    } else {
        callback(
            405,
            { statis: '405', messages: 'Method Not Allowed' },
            'json',
        );
    }
};

handlers.symbol = function (data, callback) {
    const acceptableMethods = ['get'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        getSymbolPrice[data.method](data, callback);
    } else {
        callback(
            405,
            { statis: '405', messages: 'Method Not Allowed' },
            'json',
        );
    }
};

handlers.example = function (data, callback) {
    callback(200, ['BTC', 'SHIB', 'XRP'], 'json');
};

handlers.ping = function (data, callback) {
    callback(200, 'pong', 'plain');
};

handlers.notFound = function (data, callback) {
    callback(404, { status: '404', messages: 'Not Found' }, 'json');
};

module.exports = handlers;
