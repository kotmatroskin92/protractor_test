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
        let dataFilename = pathArr.shift();
        if (!dataFilename.startsWith("@")){
            throw error
        }
        let env = require(`../../env/${this.envName}/${dataFilename.replace('@','')}.json`);
        let val= env[pathArr.shift()];
        pathArr.forEach(key => val = val[key]);
        return val;
    }
}

module.exports = new EnvReader();