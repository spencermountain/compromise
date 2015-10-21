'use strict';
let mocha = require('mocha');
let should = require('should');
let nlp = require('../../src/index.js');


describe('Sentence Class Methods', function() {

  it('Basic', function(done) {
    let sen = new nlp('Hello World').sentences[0];
    let methods = [
      'terminator',
      'tag',
      'sentence_type',
      'normalized',
      'text',
      'parents'
    ];

    methods.forEach(function(m) {
      sen.__proto__.hasOwnProperty(m).should.be.true;
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
      let s = new nlp(a[0]).sentences[0];
      s.terminator().should.eql(a[1]);
    });
    done();
  });
});



describe('tokenize sentence tests', function() {
  it('tokenize basic sentence', function(done) {
    let tests = [
      ['Tony is nice. He lives in Japan.', 2],
      ['I like that Color', 1],
      ['Hi there Dr. Joe, the price is 4.59 for N.A.S.A. Ph.Ds. I hope that\'s fine, etc. and you can attend Feb. 8th. Bye', 3],
      ['Soviet bonds to be sold in the U.S. market. Everyone wins.', 2],
      ['Hi there! Everyone wins!', 2],
      ['Hi there!!! Everyone wins.', 2],
      ['he bought Yahoo! the company.', 1],
      ['he is ill', 1],
      ['he is ill.', 1],
      ['she is fine. he is ill.', 2],
      ['she is fine. he is ill', 2],
      ['lkajsdflkjeicclksdfjefifh', 1],
      ['i think it is good ie. fantastic.', 1],
      ['i think it is good i.e. fantastic.', 1],
      ['i think it is good ... or else.', 1],
      ['i think it is good ... ', 1],
      ['What\'s my age again? What\'s my age again?', 2],
      ['the problem, eg. the javascript', 1],
      ['Dr. Tony is nice. He lives on Elm St. in Vancouver BC. Canada', 2],
      ['I made $5.60 today in 1 hour of work.  The E.M.T.\'s were on time, but only barely.', 2]
    ];
    tests.forEach(function(a) {
      let n = new nlp(a[0]);
      n.sentences.should.have.length(a[1]);
    });
    done();
  });
});
