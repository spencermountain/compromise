'use strict';
let nlp = require('../../../src/index.js');

describe('custom lexicon', function() {
  let lex = nlp.lexicon({
    'paris': 'Person',
    'donky kong': 'City',
  });
  const options = {
    lexicon: lex
  };
  let tests = [
    // ['Paris is amazing', ['Person', 'Copula', 'Adjective']], //gets overwritten by is_place
    ['Donky Kong sucks', ['City', 'Verb']],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0], options);
      console.log(s.terms);
      (tagMatch(s.terms, a[1])).should.equal(true);
      done();
    });
  });
});
