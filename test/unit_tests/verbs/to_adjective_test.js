'use strict';
let nlp = require('../../../src/index');

describe('verb.to_adjective()', function() {
  let tests = [
    ['walk', 'walkable'],
    ['sing', 'singable'],
    ['win', 'winnable'],
    ['convert', 'convertible'],
    ['see', 'visible'],
  ];
  tests.forEach(function(a) {
    it(a, function(done) {
      let v = nlp.verb(a[0]);
      v.to_adjective().should.equal(a[1]);
      done();
    });
  });

});
