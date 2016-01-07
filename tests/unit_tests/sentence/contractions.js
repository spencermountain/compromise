'use strict';
let nlp = require('../../../src/index.js');

describe('contractions', function() {

  it('expand', function(done) {
    let tests = [
      [`he's a hero`, ['he', 'is']],
      [`she's here`, ['she', 'is']],
      [`it's a hero`, ['it', 'is']],
      [`he'd win`, ['he', 'would']],
      [`they'd win`, ['they', 'would']],
      [`they've begun`, ['they', 'have']],
    ];
    tests.forEach(function(a) {
      let t = nlp.text(a[0]);
      t.contractions.expand();
      t.terms()[0].normal.should.equal(a[1][0]);
      t.terms()[1].normal.should.equal(a[1][1]);
    });
    done();
  });

  it('contract', function(done) {
    let tests = [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
    ];
    tests.forEach(function(a) {
      let t = nlp.text(a[0]);
      t.contractions.contract();
      t.terms()[0].normal.should.equal(a[1]);
      t.terms()[1].normal.should.equal('');
    });
    done();
  });

  it('preserves contractions', function(done) {
    let tests = [
      `he is a hero`,
      `she is here`,
      `it is a hero`,
      `he would win`,
      `they would win`,
    ];
    tests.forEach(function(a) {
      let t = nlp.text(a);
      t.text().should.equal(a);
    });
    done();
  });

});
