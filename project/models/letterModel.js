'use strict';
const stringUtil = require('../../framework/utils/stringUtil');

class LetterModel {
    constructor() {
        this.toEmail = 'kotmatroskin92@mail.ru';
        this.subject = 'Test topic';
        this.message = 'Rnd test message';
    }

    setRndMessage() {
        this.subject += stringUtil.getRndString();
        this.message += stringUtil.getRndString();
    }

}

module.exports = LetterModel;