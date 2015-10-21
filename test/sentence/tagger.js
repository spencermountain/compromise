'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('pos tag', function() {

  it('Basic', function(done) {
    let tests = [
      ['John is pretty', ['noun', 'verb', 'adjective']],
      ['John was lofty', ['noun', 'verb', 'adjective']],
    ];
    tests.forEach(function(a) {
      let n = new nlp(a[0]);
      let tags = n.parents()[0];
      tags.should.deepEqual(a[1]);
    });

    done();
  });

});
