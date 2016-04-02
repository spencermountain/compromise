'use strict';
let nlp = require('../../../src/index.js');

describe('verb negate', function() {

  let tests = [
    ['walks', 'doesn\'t walk'],
    ['walked', 'didn\'t walk'],
    ['walking', 'not walking'],
    ['walk', 'not walk'],
    ['will walk', 'won\'t walk'],
    ['will have walked', 'won\'t have walked'],
    ['is', 'isn\'t'],
    ['will', 'won\'t'],
    ['was', 'wasn\'t'],
  ];

  tests.forEach(function(a) {
    let v = nlp.verb(a[0]);
    it(a[1], function(done) {
      (v.negate().normal).should.equal(a[1]);
      done();
    });
  });

});
