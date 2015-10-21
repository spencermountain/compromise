//part-of-speech tagging
'use strict';
const lexicon_pass = require('./lexicon_pass');
const contractions = require('./contractions');
const assign = require('./assign');
const word_rules = require('./word_rules');
const grammar_rules = require('./grammar_rules');
const fns = require('../../fns');

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

//regex hints for words/suffixes
const word_rules_pass = function(terms) {
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

//turn [noun, noun..] into [noun..]
const chunk_neighbours = function(terms) {
  let new_terms = [];
  let last = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (last !== null && t.parent === last) {
      new_terms[new_terms.length - 1].text += ' ' + t.text;
      new_terms[new_terms.length - 1].normalize();
    } else {
      new_terms.push(t);
    }
    last = t.parent;
  }
  return new_terms;
};

//hints from the sentence grammar
const grammar_rules_pass = function(s) {
  let tags = s.tags();
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    for(let o = 0; o < grammar_rules.length; o++) {
      let rule = grammar_rules[o];
      //does this rule match
      if (fns.sameArr(rule.before, tags.slice(i, i + rule.before.length))) {
        //change before/after for each term
        for(let c = 0; c < rule.before.length; c++) {
          s.terms[i + c] = assign(s.terms[i + c], rule.after[c], 'grammar_rule ' + c);
        }
      }
    }
  }
  return s.terms;
};

const noun_fallback = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].parent === '?') {
      terms[i] = assign(terms[i], 'NN', 'fallback');
    }
  }
  return terms;
};

const tagger = function(s) {
  s.terms = capital_signals(s.terms);
  s.terms = contractions(s.terms);
  s.terms = lexicon_pass(s.terms);
  s.terms = word_rules_pass(s.terms);
  //repeat these two
  s.terms = grammar_rules_pass(s);
  s.terms = chunk_neighbours(s.terms);
  s.terms = noun_fallback(s.terms);
  return s.terms;
};

module.exports = tagger;
