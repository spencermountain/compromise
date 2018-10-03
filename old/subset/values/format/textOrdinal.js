'use strict';
const textValue = require('./textCardinal');
const ordinalWord = require('../../../world/more-data/numbers').toOrdinal;
//
const textOrdinal = num => {
  let words = textValue(num);
  //convert the last number to an ordinal
  let last = words[words.length - 1];
  words[words.length - 1] = ordinalWord[last] || last;
  return words.join(' ');
};

module.exports = textOrdinal;
