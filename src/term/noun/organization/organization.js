'use strict';
const Noun = require('../noun.js');

class Organization extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Organization'] = true;

  }
}
Organization.fn = Organization.prototype;
module.exports = Organization;
