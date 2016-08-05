'use strict';

module.exports = {
  adjective: require('./adjective'),
  adverb: require('./adverb'),
  date: require('./date'),
  noun: require('./noun'),
  person: require('./person'),
  place: require('./place'),
  term: require('./term'),
  url: require('./url'),
  value: require('./value'),
  verb: require('./verb'),
};
// 
// let terms = [
//   'adjective',
//   'adverb',
//   'date',
//   'noun',
//   'person',
//   'place',
//   'term',
//   'url',
//   'value',
//   'verb',
// ].reduce((h, s) => {
//   h[s] = require('./' + s);
//   return h;
// }, {});
// module.exports = terms;
