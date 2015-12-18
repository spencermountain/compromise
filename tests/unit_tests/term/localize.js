'use strict';
let Term = require('../../../src/term/term.js');
let tests = require('./british_terms.js');


let tiny_tests = [
  ['accessorise', 'accessorize'],
  ['accessorised', 'accessorized'],
  ['accessorises', 'accessorizes'],
  ['accessorising', 'accessorizing'],
  ['acclimatisation', 'acclimatization'],
  ['acclimatise', 'acclimatize'],
  ['acclimatised', 'acclimatized'],
  ['acclimatises', 'acclimatizes'],
  ['acclimatising', 'acclimatizing'],
  ['popularise', 'popularize'],
  ['popularised', 'popularized'],
  ['popularises', 'popularizes'],
  ['popularising', 'popularizing'],
  ['pouffe', 'pouf'],
  ['pouffes', 'poufs'],
  ['practise', 'practice'],
  ['practised', 'practiced'],
  ['practises', 'practices']
];

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
  it('britishize', function(done) {
    tiny_tests.forEach(function(a) {
      let t = new Term(a[1]);
      t.britishize().should.equal(a[0]);
    });
    done();
  });

});
