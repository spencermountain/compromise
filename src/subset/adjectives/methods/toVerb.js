'use strict';
//turn an adjective like 'soft' into a verb like 'soften'
//(don't do words like 'green' -> 'greenen')

const irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten'
};

const toVerb = str => {
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str];
  }
  if (/e$/.test(str) === true) {
    return str + 'n';
  }
  return str + 'en';
};
module.exports = toVerb;
