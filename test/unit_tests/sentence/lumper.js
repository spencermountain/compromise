'use strict';
let nlp = require('../../../src/index.js');

const tagMatch = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < terms.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      return false;
    }
  }
  return true;
};

describe('lumper test', function() {

  it('fancy lumps', function(done) {
    let tests = [
      ['John Baseball', ['Person']],
      ['John sr.', ['Person']],
      ['Dr. John', ['Person']],
      ['she said "dutch oven"', ['Person', 'PastTense', 'Noun']],
      ['she said "huge dutch oven"', ['Person', 'PastTense', 'Noun']],
      ['the Captain of Jamaica', ['Determiner', 'Noun']],
      ['joe will have walked', ['Person', 'Verb']],
      ['joe had walked', ['Person', 'PastTense']],
      ['joe had 5 books', ['Person', 'PastTense', 'Value']],
    ];
    tests.forEach(function(a) {
      let s = nlp.sentence(a[0]);
      // let tags = n.tags()[0];
      // (a[1]).should.deepEqual(tags);
      (tagMatch(s.terms, a[1])).should.equal(true);
    });

    done();
  });


});
