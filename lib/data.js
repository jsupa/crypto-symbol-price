const fs = require('fs');
const path = require('path');

const helpers = require('./helpers');

const lib = {};

lib.baseDir = path.join(__dirname, './../data/');

lib.read = function (dir, file, callback) {
    fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf8', (err, data) => {
        if (!err && data) {
            const parseData = helpers.parseJsonToObject(data);
            callback(false, parseData);
        } else {
            callback(err, data);
        }
    });
};

lib.exist = function (dir, file, callback) {
    if (fs.existsSync(`${lib.baseDir + dir}/${file}.json`)) {
        callback(false);
    } else {
        callback('File not exist yet');
    }
};

module.exports = lib;
