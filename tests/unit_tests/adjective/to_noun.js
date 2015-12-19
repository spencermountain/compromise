
'use strict';
let nlp = require('../../../src/index.js');

describe('adjective', function() {

  //americanize it
  it('to noun', function(done) {
    let tests = [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      ['ferocious', 'ferociousness'],
      ['', ''],
      [' ', ''],
      ['clean', 'cleanliness'],
    ];
    tests.forEach(function(a) {
      let adv = nlp.adjective(a[0]);
      adv.to_noun().should.equal(a[1]);
    });
    done();
  });

});
