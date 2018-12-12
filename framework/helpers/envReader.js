'use strict';
const logger = require("../logger").logger;
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
        logger.fail("Env path is not start with @");
        throw new Error("EnvPathError");
    }
    let env = require(`../../env/${envName}/${dataFilename.replace(pathChar,'')}.json`);
    let val= env[pathArr.shift()];
    pathArr.forEach(key => val = val[key]);
    logger.info(`Get value from env: ${val}`);
    return val;
}

module.exports = getEnvValue;