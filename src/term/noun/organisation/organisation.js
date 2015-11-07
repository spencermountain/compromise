'use strict';
const Noun = require('../noun.js');

class Organisation extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos = 'Organisation';
  }
}

module.exports = Organisation;
