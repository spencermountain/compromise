
'use strict';
let parse = require('../../../src/sentence/match/syntax_parse.js');

// flags:
// {
//   pos: true,
//   optional: true,
//   alias: true,
//   leading: true,
//   trailing: true,
//   any_one: true,
//   any_many: true,
// }

describe('match syntax test', function() {
  //adjective tests
  let tests = [
    ['term', {}],
    ['[term]', {
      'pos': true
    }],
    ['term?', {
      'optional': true
    }],
    ['~term~', {
      'alias': true
    }],
    ['term$', {
      'trailing': true
    }],
    ['^term', {
      'leading': true
    }]

  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let o = parse(a[0])[0];
      o.term.should.equal('term');
      (o.signals).should.deepEqual(a[1]);
      done();
    });
  });

});
