'use strict';
const data = require('../../../../data');
//turn an adjective like 'soft' into a verb like 'soften'

const irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten'
};

const convertable = data.verbConverts.reduce((h, str) => {
  h[str] = true;
  return h;
}, {});


const toVerb = (str) => {
  //don't do words like 'green' -> 'greenen'
  if (!convertable[str]) {
    return str;
  }
  //irregulars
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.match(/e$/)) {
    return str + 'n';
  }
  return str + 'en';
};
module.exports = toVerb;
