'use strict';
let nlp = require('../../../src/index.js');

describe('condition: ', function() {

  let tests = [
    ['if it is raining, the driveway is wet', 'the driveway is wet'],
    ['if it is raining, the driveway is wet, unless it is snowing', 'the driveway is wet'],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0]);
      s.strip_conditions();
      (s.text() || '').should.equal(a[1]);
      done();
    });
  });

});
