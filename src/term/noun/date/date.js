'use strict';
const Noun = require('../noun.js');
const parse = require('./parse.js');

class Date extends Noun {
  constructor(str) {
    super(str);
    this.parent = 'noun';
  }

  parse() {
    return parse(this.text);
  }

}

module.exports = Date;
