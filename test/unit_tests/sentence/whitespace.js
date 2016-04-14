'use strict';
let nlp = require('../../../src/index.js');

describe('whitespace test', function() {

  let tests = [
    ['John Baseball', 'John Baseball'],
  ];
  tests.forEach(function(a) {
    let s = nlp.sentence(a[0]);
    it(a[0], function(done) {
      (s.text()).should.equal(a[1]);
      done();
    });
  });


});
