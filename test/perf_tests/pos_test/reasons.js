'use strict';

const findReasons = function(text) {
  let reasons = {};
  let count = 0;
  for(let i = 0; i < text.sentences.length; i++) {
    for(let o = 0; o < text.sentences[i].terms.length; o++) {
      let r = text.sentences[i].terms[o].reason;
      reasons[r] = reasons[r] || 0;
      reasons[r] += 1;
      count += 1;
    }
  }
  let arr = [];
  Object.keys(reasons).forEach((k) => {
    let percent = parseInt((reasons[k] / count) * 100, 10);
    arr.push([k, percent]);
  });
  arr = arr.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    }
    return 1;
  });
  arr = arr.filter((a) => a[1] > 0);
  return arr;
};

module.exports = findReasons;
