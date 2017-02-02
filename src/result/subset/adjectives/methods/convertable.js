'use strict';
//an obj of adjectives that can be converted to superlative + comparative, via the lexicon data
const data = require('../../../../data');

const convertables = {};
data.superlatives.forEach((a) => {
  convertables[a] = true;
});
data.verbConverts.forEach((a) => {
  convertables[a] = true;
});
module.exports = convertables;
