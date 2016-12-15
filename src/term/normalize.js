'use strict';
const fixUnicode = require('./fixUnicode');

const normalize = function (term) {
  let str = term._text || '';
  str = str.toLowerCase();
  //(very) rough asci transliteration -  bjŏrk -> bjork
  str = fixUnicode(str);
  //convert hyphenations to a multiple-word term
  // str = str.replace(/([a-z])\-([a-z0-9])/g, '$1 $2');
  //
  // str = str.replace(/([a-z])\-$/, '$1');
  //hashtags, atmentions
  str = str.replace(/^[#@]/, '');
  // coerce single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
  // coerce double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');

  //strip leading & trailing grammatical punctuation
  if (!str.match(/^[:;]/)) {
    str = str.replace(/['",\.!:;\?\)]$/g, '');
    str = str.replace(/^['"\(]/g, '');
  }
  //compact acronyms
  if (term.term.isAcronym()) {
    str = str.replace(/\./g, '');
  }
  //nice-numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  term.normal = str;
};

module.exports = normalize;

// console.log(normalize('Dr. V Cooper'));
