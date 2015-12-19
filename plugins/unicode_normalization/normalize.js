// a fully-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to their approximate english ascii.
'use strict';
const data = require('./data');

const normalize = function (str) {
  let arr = str.split('').map(function (s) {
    if (data.normalize[s]) {
      return data.normalize[s] || s;
    }
    return s;
  });
  return arr.join('');
};

const denormalize = function (str, options) {
  options = options || {};
  options.percentage = options.percentage || 50;
  let arr = str.split('').map(function (s) {
    let r = Math.random() * 100;
    if (data.denormalize[s] && r < options.percentage) {
      return data.denormalize[s] || s;
    }
    return s;
  });
  return arr.join('');
};

module.exports = {
  normalize: normalize,
  denormalize: denormalize
};



// let s = 'Jørgen Fróði Čukić';
// console.log(normalize(s));
//
// s = 'The quick brown fox jumps over the lazy dog';
// console.log(denormalize(s, {
//   percentage: 50
// }));
