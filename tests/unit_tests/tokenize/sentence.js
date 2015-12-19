'use strict';
let nlp = require('../../../src/index');

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
      let n = nlp.text(a[0]);
      n.sentences.should.have.length(a[1]);
    });
    done();
  });

});
