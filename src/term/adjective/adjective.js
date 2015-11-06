'use strict';
const Term = require('../term.js');

const to_comparative = require('./to_comparative');
const to_superlative = require('./to_superlative');
const adj_to_adv = require('./to_adverb');
const adj_to_noun = require('./to_noun');

class Adjective extends Term {
  constructor(str) {
    super(str);
    this.pos = 'Adjective';
  }

  conjugate() {
    return {
      comparative: to_comparative(this.normal),
      superlative: to_superlative(this.normal),
      adverb: adj_to_adv(this.normal),
      noun: adj_to_noun(this.normal)
    };
  }

}

// let t = new Adjective("quick")
// console.log(t.conjugate())

module.exports = Adjective;
