'use strict';
let nlp = require('../../../src/index.js');

describe('pos tag', function() {

  it('Basic', function(done) {
    let tests = [
      ['John is pretty', ['Person', 'Copula', 'Adjective']],
      ['John was lofty', ['Person', 'Copula', 'Adjective']],
      ['John Smith was lofty', ['Person', 'Copula', 'Adjective']],
      ['asdfes was lofty', ['Noun', 'Copula', 'Adjective']],
      ['asdfes lksejfj was lofty', ['Noun', 'Copula', 'Adjective']],
      ['Spencer Kelly is in Canada', ['Person', 'Copula', 'Preposition', 'Place']],
      ['He is in Canada', ['Person', 'Copula', 'Preposition', 'Place']],
    ];
    tests.forEach(function(a) {
      let n = nlp.text(a[0]);
      let tags = n.tags()[0];
      (a[1]).should.deepEqual(tags);
    });

    done();
  });

});
