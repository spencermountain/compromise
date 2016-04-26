'use strict';
let Noun = require('../../../src/term/noun/noun.js');

describe('pronoun', function() {
  let tests = [
    ['John', 'he'],
    // ['John Smith', 'he'],
    ['Jane', 'she'],
    ['turtle', 'it'],
    ['turtles', 'they'],
    ['Toronto', 'it'],
    ['studying', 'it'],
    ['horses', 'they'],
    ['road bikes', 'they'],
    ['NHL goaltenders', 'they'],
    ['Tony Danza', 'he'],
    ['Tanya Danza', 'she'],
    ['Mrs. Tanya Danza', 'she'],
    ['John G. Fishermore Institute', 'it'],
    ['John Fisher & sons', 'it'],
  ];
  tests.forEach(function(a) {
    it(a[0] + ' gets pronoun', function(done) {
      let n = new Noun(a[0]);
      n.pronoun().should.equal(a[1]);
      done();
    });
  });
});
