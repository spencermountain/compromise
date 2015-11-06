'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('pos tag', function() {

  it('Basic', function(done) {
    let tests = [
      ['John is pretty', ['Person', 'Verb', 'Adjective']],
      ['John was lofty', ['Person', 'Verb', 'Adjective']],
      ['John Smith was lofty', ['Person', 'Verb', 'Adjective']],
      ['asdfes was lofty', ['Noun', 'Verb', 'Adjective']],
      ['asdfes lksejfj was lofty', ['Noun', 'Verb', 'Adjective']],
    ];
    tests.forEach(function(a) {
      let n = nlp.Text(a[0]);
      let tags = n.tags()[0];
      tags.should.deepEqual(a[1]);
    });

    done();
  });

});
