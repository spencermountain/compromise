'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('verb negate', function() {

  let tests = [
    ['walks', 'doesn\'t walk'],
    ['walked', 'didn\'t walk'],
    // ['walking', 'not walking'],
    ['walk', 'not walk'],
    // ['will walk', 'won\'t walk'],
    ['is', 'isn\'t'],
    ['will', 'won\'t'],
  ];

  tests.forEach(function(a) {
    let n = new nlp(a[0]);
    it(a[1], function(done) {
      n.terms()[0].negate().should.equal(a[1]);
      done();
    });
  });

});
