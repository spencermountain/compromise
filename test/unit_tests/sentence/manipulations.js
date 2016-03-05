'use strict';
let nlp = require('../../../src/index.js');

describe('Sentence Change tense', function() {

  let tests = [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    // ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    // ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great']
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.text(a[0]);
      s.to_past();
      s.text().should.equal(a[1]);
      s.to_future();
      s.text().should.equal(a[2]);
      s.to_present();
      s.text().should.equal(a[0]);
      done();
    });
  });

});
