'use strict';

const fallback = function(text) {
  let nouns = {};
  let count = 0;
  for(let i = 0; i < text.sentences.length; i++) {
    for(let o = 0; o < text.sentences[i].terms.length; o++) {
      let t = text.sentences[i].terms[o];
      if (t.reason === 'fallback') {
        nouns[t.normal] = nouns[t.normal] || 0;
        nouns[t.normal] += 1;
        count += 1;
      }
    }
  }
  let arr = [];
  Object.keys(nouns).forEach((k) => {
    // let percent = parseInt((nouns[k] / count) * 100, 10);
    arr.push([k, nouns[k]]);
  });
  arr = arr.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    }
    return 1;
  });
  arr = arr.slice(0, 150);
  // arr = arr.filter((a) => a[1] > 0);
  return arr;
};

module.exports = fallback;
