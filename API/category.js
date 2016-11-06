'use strict';
var request = require('request');
// var app = require('../app');
module.exports = {
    getCategory: function (BaseApiUrl, callback) {
        return getCategory(BaseApiUrl, callback);
    },
    findContentByCategory: function (BaseApiUrl, idsCtg, callback) {
        return findContent(BaseApiUrl, idsCtg, callback);
    }
}

function getCategory(BaseApiUrl, callback) {
    var options = {
        method: 'GET',
        url: BaseApiUrl+'Categories',
        headers: {
            'User-Agent': 'Setyatmoko'
        }
    };
    request(options, callback);
}

function findContent(BaseApiUrl, idsCtg, callback) {
    var options = {
        method: 'GET',
        url: BaseApiUrl+'Categories/findContentByCategory',
        qs: { ids: idsCtg },
        headers: {
            'User-Agent': 'Setyatmoko'
        }
    };
    request(options, callback);
}

