'use strict';
const fns = require('../../paths').fns;

//pretty-print a term on the nodejs console
const serverDebug = function(t) {
  let tags = Object.keys(t.tags)
    .map(tag => {
      return fns.printTag(tag);
    })
    .join(', ');
  let word = t.text;
  word = '\'' + fns.yellow(word || '-') + '\'';
  let silent = '';
  if (t.silent_term) {
    silent = '[' + t.silent_term + ']';
  }
  word = fns.leftPad(word, 20);
  word += fns.leftPad(silent, 8);
  console.log('   ' + word + '   ' + '     - ' + tags);
};
module.exports = serverDebug;
