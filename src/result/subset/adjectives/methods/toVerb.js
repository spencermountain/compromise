'use strict';
const lexicon = require('../../../../lexicon').lexicon;
//turn an adjective like 'soft' into a verb like 'soften'

const irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten'
};

const toVerb = str => {
  //don't do words like 'green' -> 'greenen'
  if (!lexicon[str]) {
    return str;
  }
  //irregulars
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str];
  }
  if (/e$/.test(str) === true) {
    return str + 'n';
  }
  return str + 'en';
};
module.exports = toVerb;
