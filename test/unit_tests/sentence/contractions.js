'use strict';
let nlp = require('../../../src/index.js');

let tests = [
  [`he's a hero`, ['he', 'is']],
  [`she's here`, ['she', 'is']],
  [`it's a hero`, ['it', 'is']],
  [`he'd win`, ['he', 'would']],
  [`they'd win`, ['they', 'would']],
  [`they've begun`, ['they', 'have']],
  [`they'll begun`, ['they', 'will']],
  [`we've begun`, ['we', 'have']],
  [`don't go`, ['do', 'not']],
  // dont expand leading 'nt contraction
  // [`mustn't go`, ['must', 'not']],
  // [`haven't gone`, ['have', 'not']],
  // [`isn't going`, ['is', 'not']],
  // ['can\'t go', ['can', 'not']],
  // ['ain\'t go', ['is', 'not']],
  // ['won\'t go', ['will', 'not']]

  ['i\'d go', ['i', 'would']],
  ['she\'d go', ['she', 'would']],
  ['he\'d go', ['he', 'would']],
  ['they\'d go', ['they', 'would']],
  ['we\'d go', ['we', 'would']],

  ['i\'ll go', ['i', 'will']],
  ['she\'ll go', ['she', 'will']],
  ['he\'ll go', ['he', 'will']],
  ['they\'ll go', ['they', 'will']],
  ['we\'ll go', ['we', 'will']],

  ['i\'ve go', ['i', 'have']],
  ['they\'ve go', ['they', 'have']],
  ['we\'ve go', ['we', 'have']],
  ['should\'ve go', ['should', 'have']],
  ['would\'ve go', ['would', 'have']],
  ['could\'ve go', ['could', 'have']],
  ['must\'ve go', ['must', 'have']],

  ['i\'m going', ['i', 'am']],
  ['we\'re going', ['we', 'are']],
  ['they\'re going', ['they', 'are']],


// [`spencer's going`, ['spencer', 'is']],
];


describe('contractions', function() {

  it('expand', function(done) {
    tests.forEach(function(a) {
      let t = nlp.text(a[0]);
      t.contractions.expand();
      t.terms()[0].normal.should.equal(a[1][0]);
      t.terms()[1].normal.should.equal(a[1][1]);
    });
    done();
  });

  it('contract', function(done) {
    let arr = [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
    ];
    arr.forEach(function(a) {
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
