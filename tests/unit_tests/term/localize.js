'use strict';
let Term = require('../../../src/term/term.js');
let tests = require('./british_terms.js');

describe('localize', function() {

  //americanize it
  it('americanize', function(done) {
    tests.forEach(function(a) {
      let t = new Term(a[0]);
      t.americanize().should.equal(a[1]);
    });
    done();
  });
  //britishize it
  //   let t2 = new Term(a[1]);
  //   it(a[0], function(done) {
  //     t2.britishize().should.equal(a[0]);
  //     done();
  //   });

});
