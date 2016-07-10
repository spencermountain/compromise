'use strict';

const normalize = function(str) {
  str = str.toLowerCase();
  //strip grammatical punctuation
  str = str.replace(/[,\.!:;\?\(\)^$]/g, '');
  //hashtags, atmentions
  str = str.replace(/^[#@]/, '');
  //convert hyphenations to a multiple-word term
  str = str.replace(/([a-z])\-([a-z])/g, '$1 $2');
  // coerce single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
  // coerce double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');
  //remove quotations + scare-quotes
  str = str.replace(/^'/g, '');
  str = str.replace(/'$/g, '');
  str = str.replace(/"/g, '');
  if (!str.match(/[a-z0-9]/i)) {
    return '';
  }
  return str;
};

module.exports = normalize;

// console.log(normalize('Dr. V Cooper'));
