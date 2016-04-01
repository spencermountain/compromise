'use strict';
let nlp = require('../../../src/index.js');

const tagMatch = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < terms.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      console.log(terms[i].pos);
      console.log(tags[i]);
      return false;
    }
  }
  return true;
};

describe('basic pos tag', function() {

  let tests = [
    ['John is pretty', ['Person', 'Copula', 'Adjective']],
    ['John was lofty', ['Person', 'Copula', 'Adjective']],
    ['John Smith was lofty', ['Person', 'Copula', 'Adjective']],
    ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
    ['asdfes lksejfj was lofty', ['Noun', 'Copula', 'Adjective']],
    ['Spencer Kelly is in Canada', ['Person', 'Copula', 'Preposition', 'Place']],
    ['He is in Canada', ['Pronoun', 'Copula', 'Preposition', 'Place']],
    //fancier stuff
    ['walk the walk', ['Verb', 'Determiner', 'Noun']],
    ['Peter the man', ['Person', 'Determiner', 'Noun']],
    ['book the flight', ['Verb', 'Determiner', 'Noun']],
    //slang, contractions
    ['u r nice', ['Pronoun', 'Copula', 'Adjective']],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0]);
      (tagMatch(s.terms, a[1])).should.equal(true);
      done();
    });

  });
});


describe('custom lexicon', function() {
  let lex = nlp.lexicon();
  lex.apple = 'Person';
  const options = {
    lexicon: lex
  };
  let tests = [
    ['Apple was good', ['Person', 'Copula', 'Adjective']],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0], options);
      (tagMatch(s.terms, a[1])).should.equal(true);
      done();
    });

  });

});
