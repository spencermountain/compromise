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
  [`don't go`, ['do not', 'go']],
  // dont expand leading 'nt contraction
  [`mustn't go`, ['must not', 'go']],
  [`haven't gone`, ['have not', 'gone']],
  [`isn't going`, ['is not', 'going']],
  ['can\'t go', ['can not', 'go']],
  ['ain\'t going', ['is not', 'going']],
  ['won\'t go', ['will not', 'go']],

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

  [`don't`, ['do not']],
  [`do not`, ['do not']],
  [`dunno`, ['do not', 'know']],

  [`spencer's`, ['spencer', 'is']],
  [`he's`, ['he', 'is']],
];


describe('contractions', function() {

  tests.forEach(function(a) {
    it('expand ' + a[0], function(done) {
      let t = nlp.text(a[0]);
      t.contractions.expand();
      t.terms()[0].normal.should.equal(a[1][0]);
      if (t.terms()[1]) {
        t.terms()[1].normal.should.equal(a[1][1]);
      }
      done();
    });
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
