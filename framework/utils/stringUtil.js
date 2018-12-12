'use strict';
const btoa = require('btoa');

const getRndString = (charCounter=7) => {
    return btoa(Math.random()).substr(0, charCounter);
};

module.exports = getRndString;