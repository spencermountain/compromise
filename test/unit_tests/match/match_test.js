
'use strict';
let nlp = require('../../../src/index.js');

describe('term match test', function() {
  //adjective tests
  let tests = [
    ['quick', 'quick', true],
    ['Quick', 'Quick', true],
    ['quick', 's', false],
    ['quick', '[Adjective]', true],
    ['quick', '[Noun]', false],
    ['quick', '(fun|nice|quick|cool)', true],
    ['quick', '(fun|nice|good)', false],
  ];
  let options = {};
  tests.forEach(function(a) {
    it(a.join(' | '), function(done) {
      let t = nlp.adjective(a[0]);
      (t.match(a[1], options) === a[2]).should.equal(true);
      done();
    });
  });

});
//
describe('sentence lookup', function() {
  let tests = [
    ['the dog played', 'the dog', 'the dog'],
    ['the dog played', 'the dog played', 'the dog played'],
    ['the dog played', 'the [Noun]', 'the dog'],
    ['the dog played', 'the [Noun] played', 'the dog played'],
    ['the dog played', 'the cat played', ''],
    ['the dog played', 'the [Adjective] played', ''],
    ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
    ['the dog played', 'the (cat|piano) played', ''],
    ['the dog played', 'the . played', 'the dog played'],
    //optional
    ['the dog played', 'the dog quickly? played', 'the dog played'],
    ['the dog played', 'the dog [Adverb]? played', 'the dog played'],
    ['the dog quickly played', 'the dog [Adverb]? played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog [Adverb] played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog . played', 'the dog quickly played'],
    ['the dog quickly played', 'the dog .? played', 'the dog quickly played'],
    // ['the dog played', 'the dog .? played', 'the dog played'],

    //leading/trailing logic
    ['the dog played', 'the dog played$', 'the dog played'],
    ['the dog played', 'the dog', 'the dog'],
    ['the dog played', 'the dog$', ''],
    ['the dog played', 'the dog$ played', ''],
    ['the dog played', '^the dog', 'the dog'],
    ['the dog played', 'dog played', 'dog played'],
    ['the dog played', '^dog played', ''],
    ['the dog played', '^played', ''],
    ['the dog played', '^the', 'the'],

    ['john eats glue', 'john eats glue', 'john eats glue'],
    ['john eats glue', 'john eats', 'john eats'],
    ['john eats glue', 'eats glue', 'eats glue'],
    ['john eats glue', 'eats glue all day', ''],

    //test contractions
    [`if you don't mind`, `you don't mind`, `you don't mind`],
    [`if you don't mind`, `you don't care`, ``],
    [`if you don't mind`, `you don't`, `you don't`],
    [`if you don't mind`, `don't mind`, `don't mind`],
    [`if you didn't care`, `didn't`, `didn't`],
    // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

    [`don't go`, `do not`, `don't`],
    [`do not go`, `do not`, `do not`],
    [`i dunno`, `do not`, `dunno`],

  ];
  tests.forEach(function(a) {
    it(a.join(' | '), function(done) {
      let t = nlp.sentence(a[0]);
      let r = t.match(a[1]);
      if (r) {
        r = r[0].text();
      }
      (r || '').should.equal(a[2]);
      done();
    });
  });

});

describe('replace', function() {
  let tests = [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the [Noun]', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the [Noun]', 'the house', 'the house and the house']
  ];
  tests.forEach(function(a) {
    it(a.join(' | '), function(done) {
      let s = nlp.sentence(a[0]);
      let replaced = s.replace(a[1], a[2]).text();
      (replaced || '').should.equal(a[3]);
      done();
    });
  });

});
