
// This mixin swaps complex words for their simple forms
//https://github.com/spencermountain/simple_english
'use strict';
let mapping = require('./data').reduce(function(h, a) {
  h[a[0]] = a[1];
  return h;
}, {});

let simple_english = {
  Text: {
    simplify : function() {
      this.sentences.forEach(function(s) {
        s.terms.forEach(function(t) {
          if (mapping[t.normal]) {
            t.text = mapping[t.normal];
            t.rebuild();
          }
        });
      });
      return this;
    }
  }
};
module.exports = simple_english;
/////
// Usage:
////
// const nlp_compromise = require('../../src/index');
// nlp_compromise.mixin(simple_english);
// var s = nlp_compromise.text('She administers the needle');
// s.simplify();
// console.log(s.text());
// // "She gives the needle"
