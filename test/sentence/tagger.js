'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('pos tag', function() {

  it('Basic', function(done) {
    let tests = [
      ['John is pretty', ['noun', 'verb', 'adjective']],
      ['John was lofty', ['noun', 'verb', 'adjective']],
      ['John Smith was lofty', ['noun', 'verb', 'adjective']],
      ['asdfes was lofty', ['noun', 'verb', 'adjective']],
      ['asdfes lksejfj was lofty', ['noun', 'verb', 'adjective']],
    ];
    tests.forEach(function(a) {
      let n = nlp.Text(a[0]);
      let tags = n.tags()[0];
      tags.should.deepEqual(a[1]);
    });

    done();
  });

});
