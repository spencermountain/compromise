'use strict';
let nlp = require('../../../src/index.js');

describe('contractions', function() {

  it('first word', function(done) {
    let tests = [
      [`he's a hero`, ['he', 'is']],
      [`she's here`, ['she', 'is']],
    // [`it's a hero`, ['it', 'is']],
    // [`he'd win`, ['he', 'would']],
    ];
    tests.forEach(function(a) {
      let t = nlp.text(a[0]);
      t.render_contractions();
      t.terms()[0].normal.should.equal(a[1][0]);
      t.terms()[1].normal.should.equal(a[1][1]);
    });
    done();
  });


  it('preserves contractions', function(done) {
    done();
  });
});
