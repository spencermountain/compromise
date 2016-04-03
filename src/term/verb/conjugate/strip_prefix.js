'use strict';
// 'over-kill' should use conjugation rules of 'kill', etc..

const strip_prefix = function(str) {
  let prefix = '';
  let match = str.match(/^(over|under|re|anti|full|cross)([- ])?([^aeiou][a-z]*)/i);
  if (match) {
    prefix = match[1] + (match[2] || '');
  }
  return prefix;
};

module.exports = strip_prefix;
