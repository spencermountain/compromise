'use strict';
const lexicon = require('../../../lexicon.js');
const assign = require('../assign');

const should_merge = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //if it's a known multiple-word term
  if (lexicon[a.normal + ' ' + b.normal]) {
    return true;
  }
  return false;
};

const multiples_pass = function(terms) {
  let new_terms = [];
  let last_one = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_merge(last_one, t)) {
      let last = new_terms[new_terms.length - 1];
      last.text += ' ' + t.text;
      last.rebuild();
      let pos = lexicon[last.normal];
      new_terms[new_terms.length - 1] = assign(last, pos, 'multiples_pass_lexicon');
    } else {
      new_terms.push(t);
    }
    last_one = t;
  }
  return new_terms;
};

module.exports = multiples_pass;
