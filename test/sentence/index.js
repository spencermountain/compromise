'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');

describe('Sentence Class Methods', function() {

  it('Basic', function(done) {
    let sen = nlp.Text('Hello World').sentences[0];
    let methods = [
      'terminator',
      'text',
    ];

    methods.forEach(function(m) {
      sen.__proto__.hasOwnProperty(m).should.equal(true);
    });

    done();
  });

  it('Termination', function(done) {

    let tests = [
      ['Tony is nice.', '.'],
      ['Tony is nice!', '!'],
      ['Is Tony is nice?', '?'],
      ['Tony is okay', '.']
    ];

    tests.forEach(function(a) {
      let s = nlp.Text(a[0]).sentences[0];
      s.terminator().should.eql(a[1]);
    });
    done();
  });
});
