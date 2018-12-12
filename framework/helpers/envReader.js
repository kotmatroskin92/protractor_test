'use strict';
const pathDelimiter = '.';
const pathChar = '@';
let configFilePath = '../../config.json';
let envName = readENV();

function readENV(filePath=configFilePath){
    const config = require(filePath);
    return config.env;
    }

function getEnvValue(path) {
    let pathArr = path.split(pathDelimiter);
    let dataFilename = pathArr.shift();
    if (!dataFilename.startsWith(pathChar)){
        throw error
    }
    let env = require(`../../env/${envName}/${dataFilename.replace(pathChar,'')}.json`);
    let val= env[pathArr.shift()];
    pathArr.forEach(key => val = val[key]);
    return val;
}

module.exports = getEnvValue;