'use strict';
//ngrams are consecutive terms of a specific size
const ngram = function(options) {
  options = options || {};
  options.size = options.size || [1, 2, 3];
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  //flatten terms
  let terms = this.list.map((ts) => {
    return ts.terms.map((t) => t.normal);
  });

  //count freq
  let obj = {};
  //each gram-size
  options.size.forEach((size) => {
    obj[size] = {};
    //each sentence/match
    for(let s = 0; s < terms.length; s++) {
      //start slice at each term
      for(let o = 0; o < terms[s].length - size + 1; o++) {
        let str = terms[s].slice(o, o + size).join(' ');
        obj[size][str] = obj[size][str] || 0;
        obj[size][str] += 1;
      }
    }
  });

  //flatten to an array
  let arr = [];
  Object.keys(obj).forEach((size) => {
    Object.keys(obj[size]).forEach((k) => {
      arr.push({
        text: k,
        count: obj[size][k],
        size: parseInt(size, 10)
      });
    });
  });
  //sort the array
  arr = arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    //(the tie-braker)
    if (a.count === b.count && a.size > b.size) {
      return -1;
    }
    return 1;
  });
  return arr;
};

module.exports = ngram;
