'use strict';
//index a lexicon by its first-word
// - used for the multiple-word-lumper
const firstWord = (arr) => {
  let all = {};
  arr.forEach((obj) => {
    Object.keys(obj).forEach((str) => {
      let words = str.split(' ');
      if (words.length > 1) {
        let w = words[0];
        all[w] = all[w] || {};
        let rest = words.slice(1).join(' ');
        all[w][rest] = obj[str];
      }
    });
  });
  return all;
};
module.exports = firstWord;
