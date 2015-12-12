
'use strict';
let Term = require('../../../src/term/term.js');

describe('syllables', function() {

  //americanize it
  it('count syllables', function(done) {
    let tests = [
      ['suddenly', 3],
      ['constipation', 4],
      ['diabolic', 4],
      // ['fate', 1],
      ['fated', 2],
      // ['fates', 1],
      ['genetic', 3],
      // ['deviled', 3],
      ['imitated', 4],
      ['tree', 1],
      ['civilised', 3],
    // ['horse', 1],
    ];
    tests.forEach(function(a) {
      let t = new Term(a[0]);
      t.syllables().length.should.equal(a[1]);
    });
    done();
  });

});
