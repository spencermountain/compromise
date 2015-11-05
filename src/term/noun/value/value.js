'use strict';
const Noun = require('../noun.js');
const to_number = require('./to_number.js');

class Value extends Noun {
  constructor(str) {
    super(str);
    this.parent = 'noun';
  }

  to_number() {
    return to_number(this.text);
  }

}

module.exports = Value;
