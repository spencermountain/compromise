'use strict';
let nlp = require('../../../src/index.js');

describe('Sentence Manipulation Methods', function() {

  it('Change tense', function(done) {
    let tests = [
      ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
      ['he is quick', 'he was quick', 'he will be quick'],
    ];
    tests.forEach(function(a) {
      let s = nlp.Text(a[0]);
      s.to_past();
      s.text().should.equal(a[1]);
      s.to_future();
      s.text().should.equal(a[2]);
      s.to_present();
      s.text().should.equal(a[0]);
    });
    done();
  });

});
