'use strict';
var request = require('request');
module.exports = {
    showContent: function (BaseApiUrl, offset, limit, callback) {
        return showContent(BaseApiUrl, offset, limit, callback);
    },
    getContentByUri : function (BaseApiUrl, uri, callback) {
        return getContent(BaseApiUrl, uri, callback);
    }
}

function showContent(BaseApiUrl, offset, limit, callback) {
    var options = {
        method: 'GET',
        url: BaseApiUrl+'Contents/find?offset='+offset+'&limit='+limit,
        headers: {
            'User-Agent': 'Setyatmoko'
        }
    };
    request(options, callback);
}

function getContent(BaseApiUrl, uri, callback) {
    var options = {
        method: 'GET',
        url: BaseApiUrl+'Contents/'+uri+'/findContentByUri',
        headers: {
            'User-Agent': 'Setyatmoko'
        }
    };
    request(options, callback);
}

