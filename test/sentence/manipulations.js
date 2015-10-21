'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('Sentence Manipulation Methods', function() {

  it('Change tense', function(done) {
    let tests = [
      ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
      ['he is quick', 'he was quick', 'he will be quick'],
    ];

    tests.forEach(function(a) {
      let s = new nlp(a[0]);
      s.to_past();
      s.text().should.equal(a[1]);
      s.to_future();
      s.text().should.equal(a[2]);
    });

    done();
  });

});
