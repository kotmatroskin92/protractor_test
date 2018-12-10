'use strict';
const btoa = require('btoa');

class StringUtil {

    getRndString(charCounter=5) {
        return btoa(Math.random()).substr(0, charCounter)
    }
}

module.exports = new StringUtil();