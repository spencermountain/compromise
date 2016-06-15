'use strict';
let nlp = require('../../../src/index.js');

describe('is email ', function() {
  let tests = [
    [`s@s.com`, true],
    [`sasdf@sasdf.com`, true],
    [`sasdf@sasdf.ti`, true],
    [`sasdf@sasdf.t`, false],
    [`sasdf@sasdft`, false],
    [`sasdfsasdft.com`, false],
    [`@sasdft.com`, false],
    [`_@_.com`, true],
    [`_@_._`, false],
    [`sas df@sasdf.com`, false],
    [`sasdf@sa sdf.com`, false],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let t = nlp.sentence(a[0]).terms[0];
      (t.pos.Email || false).should.equal(a[1]);
      done();
    });
  });
});

describe('is hashtag ', function() {
  let tests = [
    [`#lkjsdf`, true],
    [`#ll`, true],
    [`#22ll`, true],
    [`#_22ll`, true],
    [`#l`, false],
    [`# l`, false],
    [`l#l`, false],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let t = nlp.sentence(a[0]).terms[0];
      (t.pos.HashTag || false).should.equal(a[1]);
      done();
    });
  });
});
