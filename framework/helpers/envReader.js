class EnvReader {
    constructor() {
        this.configFilePath = '../../config.json';
        this.envName = this.readENV();

    }

    readENV(filePath=this.configFilePath){
        var config = require(filePath);
        var val= config.env;
        return val;
    }

    getValue(path) {
        let pathArr = path.split('.');
        var env = require(`../../env/${this.envName}/${pathArr.shift()}.json`);
        var val= env[pathArr.shift()];
        pathArr.forEach(key => val = val[key]);
        return val;
    }
}

module.exports = new EnvReader();