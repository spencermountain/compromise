'use strict';

//do either bigram, trigram, whatever,,
const doSize = (size, terms) => {
  let all = [];
  for(let i = 0; i < terms.length - size + 1; i++) {
    all.push();
  }
  return all;
};

//
const ngram = function(options) {
  options = options || {};
  const maxGram = options.max_gram || 5;
  const minGram = options.min_gram || 1;

  let terms = this.list.map((ts) => {
    return ts.terms.map((t) => t.normal);
  });
  let obj = {};
  //each gram-size
  for(let size = minGram; size < maxGram; size++) {
    //each sentence/match
    for(let s = 0; s < terms.length; s++) {
      // all = all.concat(doSize(size, terms[s]));
      for(let o = 0; o < terms[s].length; o++) {
        let str = terms[s].slice(o, o + size).join(' ');
        obj[str] = obj[str] || 0;
        obj[str] += 1;
      }
    }
  }
  return obj;
};

module.exports = ngram;
