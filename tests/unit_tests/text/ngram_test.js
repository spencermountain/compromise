
'use strict';
let nlp = require('../../../src/index.js');

describe('ngram', function() {

  it('top ngram', function(done) {
    let tests = [
      ['toronto', 'toronto', 1],
      ['toronto is toronto', 'toronto', 2],
      ['Tom Hanks came for dinner', 'tom hanks', 1],
      ['Tom Hanks played Tom Hanks for dinner', 'tom hanks', 2],
      ['Tom Hanks played Tom Hanks. We watched Tom Hanks.', 'tom hanks', 3],
      ['55 and 55', '55', 2],
    ];
    tests.forEach(function(a) {
      let n = nlp.text(a[0]);
      let topgram = n.ngram()[0][0];
      topgram.word.should.equal(a[1]);
      topgram.count.should.equal(a[2]);
    });
    done();
  });

});
