//part-of-speech tagging
'use strict';
const lexicon_pass = require('./lexicon_pass');
const contractions = require('./contractions');
const assign = require('./assign');
const word_rules = require('./word_rules');

//set POS for capitalised words
const capital_signals = function(terms) {
  //first words need careful rules
  if (terms[0].is_acronym()) {
    terms[0] = assign(terms[0], 'NN', 'acronym');
  }
  //non-first-word capitals are nouns
  for (let i = 1; i < terms.length; i++) {
    if (terms[i].is_capital() || terms[i].is_acronym()) {
      terms[i] = assign(terms[i], 'NN', 'capital_signal');
    }
  }
  return terms;
};

//regex-rules for words/suffixes
const rules_pass = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    for (let o = 0; o < word_rules.length; o++) {
      if (terms[i].normal.length > 4 && terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass');
        break;
      }
    }
  }
  return terms;
};

const tagger = function(s) {
  s.terms = capital_signals(s.terms);
  s.terms = contractions(s.terms);
  s.terms = lexicon_pass(s.terms);
  s.terms = rules_pass(s.terms);
  return s.terms;
};

module.exports = tagger;
