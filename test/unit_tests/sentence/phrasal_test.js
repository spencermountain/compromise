'use strict';
let nlp = require('../../../src/index.js');



describe('phrasal_tests: ', function() {
  let tests = [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let s = nlp.sentence(a[0]);
      for(let i = 0; i < s.terms.length; i++) {
        (s.terms[i].normal).should.equal(a[1][i]);
      }
      done();
    });
  });

});
