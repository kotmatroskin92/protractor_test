'use strict';
const getRndString = require('../../framework/utils/stringUtil');

class LetterModel {
    constructor() {
        this.toEmail = 'kotmatroskin92@mail.ru, 53adminmail@mail.ru';
        this.subject = 'Test topic';
        this.message = 'Rnd test message';
    }

    setRndData() {
        this.subject += getRndString();
        this.message += getRndString();
    }

    getToEmailNoDelimiter() {
        return this.toEmail.replace(',', '');
    }
}

module.exports = LetterModel;