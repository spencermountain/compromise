'use strict';
const Noun = require('../noun.js');

class Organisation extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Organisation'] = true;

  }
}
Organisation.fn = Organisation.prototype;
module.exports = Organisation;
