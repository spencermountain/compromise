'use strict';
const fns = require('../fns');

// const colors = {
//   'Person': '#6393b9',
//   'Pronoun': '#81acce',
//   'Noun': 'steelblue',
//   'Verb': 'palevioletred',
//   'Adverb': '#f39c73',
//   'Adjective': '#b3d3c6',
//   'Determiner': '#d3c0b3',
//   'Preposition': '#9794a8',
//   'Conjunction': '#c8c9cf',
//   'Value': 'palegoldenrod',
//   'Expression': '#b3d3c6'
// };

const tag = (t, pos, reason) => {
  let title = t.normal || '[' + t.silent_term + ']';
  title = fns.leftPad('\'' + title + '\'', 12);
  title += '  ->   ' + pos;
  title += fns.leftPad((reason || ''), 15);
  console.log('%c' + title, ' color: #a2c99c');
};
const untag = (t, pos, reason) => {
  let title = t.normal || '[' + t.silent_term + ']';
  title = fns.leftPad('\'' + title + '\'', 12);
  title += '  ~*   ' + pos;
  title += '    ' + (reason || '');
  console.log('%c' + title, ' color: #b66a6a');
};
module.exports = {
  tag: tag,
  untag: untag,
};
