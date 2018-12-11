'use strict';
const StringUtil = require('../../framework/utils/stringUtil');

class LetterModel {
    constructor() {
        this.toEmail = 'kotmatroskin92@mail.ru';
        this.subject = 'Test topic';
        this.message = 'Rnd test message';
    }

    setRndMessage() {
        this.subject += StringUtil.getRndString();
        this.message += StringUtil.getRndString();
    }
}

module.exports = LetterModel;