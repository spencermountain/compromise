'use strict';
let nlp = require('../../../src/index.js');

const all_quotations = function(s) {
  let str = '';
  for(let i = 0; i < s.terms.length; i++) {
    if (s.terms[i].pos.Quotation) {
      str += ' ' + s.terms[i].normal;
    }
  }
  return str.trim();
};

describe('quotation: ', function() {

  let tests = [
    [`he is "really good"`, `really good`],
    [`he is "really good" i guess`, `really good`],
    [`he is "good" i guess`, `good`],
    [`he is "completely and utterly great" i guess`, `completely and utterly great`],
    [`“quote”`, `quote`],
    [`“quote is here”`, `quote is here`],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0]);
      let quote = all_quotations(s);
      (quote).should.equal(a[1]);
      done();
    });
  });

});
