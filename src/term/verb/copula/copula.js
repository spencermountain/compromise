'use strict';
const Verb = require('../verb.js');

class Copula extends Verb {
  constructor(str, tag) {
    super(str);
  }
}
Copula.fn = Copula.prototype;

module.exports = Copula;

// let s = new Copula('is');
// console.log(s);
