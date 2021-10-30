const pineapple = require('../modules/pineapple');

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

handlers.methods = function (data, callback) {
    const acceptableMethods = ['post', 'get'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        pineapple[data.method](data, callback);
    } else {
        callback(
            405,
            { statis: '405', messages: 'Method Not Allowed' },
            'json',
        );
    }
};

handlers.ping = function (data, callback) {
    callback(200, 'pong', 'plain');
};

handlers.notFound = function (data, callback) {
    callback(404, { status: '404', messages: 'Not Found' }, 'json');
};

module.exports = handlers;
