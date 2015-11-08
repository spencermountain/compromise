'use strict';
let mocha = require('mocha');
let should = require('should');
let Noun = require('../../src/term/noun/noun.js');

describe('pronoun', function() {
  it('gets pronoun', function(done) {
    let tests = [
      // ['John', 'he']
    ];
    tests.forEach(function(a) {
      let n = new Noun(a[0]);
      n.pronoun().should.equal(a[1]);
    });
    done();
  });
});
