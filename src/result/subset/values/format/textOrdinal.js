'use strict';
const toNumber = require('../toNumber');
const toText = require('../toText');
const ordinalWord = require('../../../paths').data.ordinalMap.toOrdinal;
//
const textOrdinal = (ts) => {
  let num = toNumber(ts);
  let words = toText(num);
  //convert the last number to an ordinal
  let last = words[words.length - 1];
  words[words.length - 1] = ordinalWord[last] || last;
  return words.join(' ');
};

module.exports = textOrdinal;
