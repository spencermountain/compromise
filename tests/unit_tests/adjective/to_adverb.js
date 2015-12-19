
'use strict';
let nlp = require('../../../src/index.js');

describe('adjective methods', function() {

  it('to adverb', function(done) {
    let tests = [
      ['quick', 'quickly'],
      ['idle', 'idly'],
      ['dirty', ''],
      ['fun', ''],
      ['full', ''],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely'],
    ];
    tests.forEach(function(a) {
      let adv = nlp.adjective(a[0]);
      (adv.to_adverb() || '').should.equal(a[1]);
    });
    done();
  });

  it('to superlative', function(done) {
    let tests = [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
    ];
    tests.forEach(function(a) {
      let adv = nlp.adjective(a[0]);
      (adv.to_superlative() || '').should.equal(a[1]);
    });
    done();
  });

  it('to comparative', function(done) {
    let tests = [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      ['quixotic', 'more quixotic'],
      ['cute', 'cuter'],
    ];
    tests.forEach(function(a) {
      let adv = nlp.adjective(a[0]);
      (adv.to_comparative() || '').should.equal(a[1]);
    });
    done();
  });

  it('conjugate', function(done) {
    let adv = nlp.adjective('nice');
    let o = adv.conjugate();
    (o.comparative).should.equal('nicer');
    (o.superlative).should.equal('nicest');
    (o.adverb).should.equal('nicely');
    (o.noun).should.equal('niceness');
    done();
  });

});
