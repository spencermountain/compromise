'use strict';
let terms = [
  'adjective',
  'adverb',
  'date',
  'noun',
  'person',
  'place',
  'term',
  'url',
  'value',
  'verb',
].reduce((h, s) => {
  h[s] = require('./' + s + '/index');
  return h;
}, {});
module.exports = terms;
