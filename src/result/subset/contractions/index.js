'use strict';
const Text = require('../../index');
const contract = require('./contract');
const Contraction = require('./contraction');
const findExpanded = require('./find');

class Contractions extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal(),
      };
    });
  }

  contract() {
    return contract(this.all());
  }
  static find(r) {
    //always two words
    let contracted = r.match('#Contraction #Contraction');
    contracted.list = contracted.list.map((ts) => {
      let c = new Contraction(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
      c.expanded = false;
      return c;
    });
    // console.log('==contracted==');
    // console.log(contracted.plaintext());
    // console.log('');
    let expanded = findExpanded(r);
    // console.log('==expanded==');
    // console.log(expanded.plaintext());
    // console.log('');
    // expanded = expanded.not(contr);
    // expanded.check();
    // contr.concat(expanded);
    let m = contracted.concat(expanded);
    m.sort('chronological');
    return m;
  }
}

module.exports = Contractions;
