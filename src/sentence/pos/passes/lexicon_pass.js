'use strict';
let defaultLexicon = require('../../../lexicon.js');
const assign = require('../assign');

//consult lexicon for this known-word
const lexicon_pass = function(terms, options) {
  let lexicon = options.lexicon || defaultLexicon;
  return terms.map(function(t) {
    //check lexicon straight-up
    if (lexicon[t.normal] !== undefined) {
      return assign(t, lexicon[t.normal], 'lexicon_pass');
    }

    if (lexicon[t.expansion] !== undefined) {
      return assign(t, lexicon[t.expansion], 'lexicon_expansion');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (t.normal.match(/^(over|under|out|-|un|re|en).{3}/)) {
      const attempt = t.normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
      return assign(t, lexicon[attempt], 'lexicon_prefix');
    }
    //try to match without a contraction - "they've" -> "they"
    if (t.has_abbreviation()) {
      let attempt = t.normal.replace(/'(ll|re|ve|re|d|m)/, '');
      // attempt = t.normal.replace(/n't/, '');
      return assign(t, lexicon[attempt], 'lexicon_prefix');
    }

    //match 'twenty-eight'
    if (t.normal.match(/-/)) {
      let sides = t.normal.split('-');
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
