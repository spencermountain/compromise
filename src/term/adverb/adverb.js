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
  all_forms() {
    return {
      adjective: this.to_adjective(),
      normal: this.normal
    }
  }
}
Adverb.fn = Adverb.prototype;

//let t = new Adverb("quickly")
//console.log(t.all_forms());

module.exports = Adverb;
