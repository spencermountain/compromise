
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
  ];
  tests.forEach(function(a) {
    it(a.join(' | '), function(done) {
      let t = nlp.sentence(a[0]);
      let r = t.match(a[1])[0];
      if (r) {
        r = r.text();
      }
      (r || '').should.equal(a[2]);
      done();
    });
  });

});

// describe('replace', function() {
//   let tests = [
//     ['the dog played', 'the dog', 'the cat', 'the cat played'],
//     ['the boy and the girl', 'the [Noun]', 'the house', 'the house and the house']
//   ];
//   tests.forEach(function(a) {
//     it(a.join(' | '), function(done) {
//       let s = nlp.sentence(a[0]);
//       let replaced = s.replace(a[1], a[2]).text();
//       (replaced || '').should.equal(a[3]);
//       done();
//     });
//   });
//
// });
