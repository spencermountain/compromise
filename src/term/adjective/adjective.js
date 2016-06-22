'use strict';
const Term = require('../term.js');

const to_comparative = require('./to_comparative');
const to_superlative = require('./to_superlative');
const adj_to_adv = require('./to_adverb');
const adj_to_noun = require('./to_noun');

class Adjective extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    if (tag) {
      this.pos[tag] = true;
    }
    this.pos['Adjective'] = true;
  }

  to_comparative() {
    return to_comparative(this.normal);
  }
  to_superlative() {
    return to_superlative(this.normal);
  }
  to_noun() {
    return adj_to_noun(this.normal);
  }
  to_adverb() {
    return adj_to_adv(this.normal);
  }
  conjugate() {
    return {
      comparative: to_comparative(this.normal),
      superlative: to_superlative(this.normal),
      adverb: adj_to_adv(this.normal),
      noun: adj_to_noun(this.normal)
    };
  }
  all_forms() {
    let forms = this.conjugate();
    forms['normal'] = this.normal;
    return forms;
  }

}
Adjective.fn = Adjective.prototype;

//let t = new Adjective("quick")
//console.log(t.all_forms());

module.exports = Adjective;
