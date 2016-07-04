'use strict';
let defaultLexicon = require('../../../lexicon.js');
const assign = require('../assign');

//consult lexicon for this known-word
const lexicon_pass = function(terms, options) {
  let lexicon = options.lexicon || defaultLexicon;
  return terms.map(function(t) {

    let normal = t.normal;
    //normalize apostrophe s for grammatical purposes
    if (t.has_abbreviation()) {
      let split = normal.split(/'/);
      if (split[1] === 's') {
        normal = split[0];
      }
    }

    //check lexicon straight-up
    if (lexicon[normal] !== undefined) {
      return assign(t, lexicon[normal], 'lexicon_pass');
    }

    if (lexicon[t.expansion] !== undefined) {
      return assign(t, lexicon[t.expansion], 'lexicon_expansion');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (normal.match(/^(over|under|out|-|un|re|en).{3}/)) {
      const attempt = normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      if (lexicon[attempt]) {
        return assign(t, lexicon[attempt], 'lexicon_prefix');
      }
    }
    //try to match without a contraction - "they've" -> "they"
    if (t.has_abbreviation()) {
      let attempt = normal.replace(/'(ll|re|ve|re|d|m|s)$/, '');
      // attempt = attempt.replace(/n't/, '');
      if (lexicon[attempt]) {
        return assign(t, lexicon[attempt], 'lexicon_suffix');
      }
    }

    //match 'twenty-eight'
    if (normal.match(/-/)) {
      let sides = normal.split('-');
      if (lexicon[sides[0]]) {
        return assign(t, lexicon[sides[0]], 'lexicon_dash');
      }
      if (lexicon[sides[1]]) {
        return assign(t, lexicon[sides[1]], 'lexicon_dash');
      }
    }
    return t;
  });
};
module.exports = lexicon_pass;
