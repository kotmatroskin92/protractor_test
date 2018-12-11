'use strict';
const btoa = require('btoa');

class StringUtil {

    static getRndString(charCounter=7) {
        return btoa(Math.random()).substr(0, charCounter)
    }
}

module.exports = StringUtil;