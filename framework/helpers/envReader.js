'use strict';
const pathDelimiter = '.';
const pathChar = '@';

class EnvReader {
    constructor() {
        this.configFilePath = '../../config.json';
        this.envName = this.readENV();
    }

    readENV(filePath=this.configFilePath){
        const config = require(filePath);
        return config.env;
    }

    getValue(path) {
        let pathArr = path.split(pathDelimiter);
        let dataFilename = pathArr.shift();
        if (!dataFilename.startsWith(pathChar)){
            throw error
        }
        let env = require(`../../env/${this.envName}/${dataFilename.replace(pathChar,'')}.json`);
        let val= env[pathArr.shift()];
        pathArr.forEach(key => val = val[key]);
        return val;
    }
}
module.exports = new EnvReader();