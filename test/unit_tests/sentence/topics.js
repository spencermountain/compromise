'use strict';
let nlp = require('../../../src/index.js');

describe('topics test', function() {

  let tests = [
    ['James and Tony Hawk both live in Toronto. Tony Hawk is cool.', 'tony hawk'],
    ['I live Toronto. I think Toronto is cool.', 'toronto'],
    ['The EACD united in 1972. EACD must follow regulations.', 'eacd'],
    ['The Elkjsdflkjsdf sells hamburgers. I think the Elkjsdflkjsdf eats turky.', 'elkjsdflkjsdf'],
    ['Toronto\'s citizens love toronto!', 'toronto'],
  ];
  tests.forEach(function(a) {
    it(a[0], function(done) {
      let topics = nlp.text(a[0]).topics();
      (topics[0].text).should.equal(a[1]);
      done();
    });
  });


});
