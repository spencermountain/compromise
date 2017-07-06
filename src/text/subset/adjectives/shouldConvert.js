'use strict';
const lexicon = require('../../../lexicon').lexicon;

//is this an adjective we want to goof-around with?
const shouldConvert = function(str) {
  if (!str || str.length <= 3) {
    return false;
  }
  if (lexicon[str] === 'Comparable') {
    return true;
  }
  if (lexicon[str] === 'Adjective') {
    return false;
  }
  //has space
  if (str.indexOf(' ') !== -1) {
    return false;
  }
  return true;
};
module.exports = shouldConvert;

// console.log(shouldConvert('low'));
