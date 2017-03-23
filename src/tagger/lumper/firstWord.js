'use strict';
//index a lexicon by first-word
const firstWord = (obj) => {
  return Object.keys(obj).reduce((h, str) => {
    let words = str.split(' ');
    if (words.length > 1) {
      let w = words[0];
      h[w] = h[w] || {};
      let rest = words.slice(1).join(' ');
      h[w][rest] = words.length;
    }
    return h;
  }, {});
};
module.exports = firstWord;
