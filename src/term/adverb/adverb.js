'use strict';
const Term = require('../term.js');
const to_adjective = require('./to_adjective.js');

class Adverb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Adverb'] = true;
  }
  to_adjective() {
    return to_adjective(this.normal);
  }
}
Adverb.fn = Adverb.prototype;
// let t = new Adverb("quickly")
// console.log(t.to_adjective())

module.exports = Adverb;
