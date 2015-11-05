'use strict';
const Noun = require('../noun.js');

class Organisation extends Noun {
  constructor(str) {
    super(str);
    this.pos = 'Organisation';
  }
}

module.exports = Organisation;
