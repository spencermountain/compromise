//part-of-speech tagging
'use strict';

const lump_two = require('./lumper/lump_two');
const lump_three = require('./lumper/lump_three');
const pos = require('./parts_of_speech');
const assign = require('./assign');

const grammar_pass = require('./passes/grammar_pass');
const interjection_fixes = require('./passes/interjection_fixes');
const lexicon_pass = require('./passes/lexicon_pass');
const capital_signals = require('./passes/capital_signals');
const conditional_pass = require('./passes/conditional_pass');
const ambiguous_dates = require('./passes/ambiguous_dates');
const multiple_pass = require('./passes/multiples_pass');
const regex_pass = require('./passes/regex_pass');
const quotation_pass = require('./passes/quotation_pass');
const possessive_pass = require('./passes/possessive_pass');
const contraction_pass = require('./passes/contractions/interpret');
const question_pass = require('./passes/question_pass');
const web_text_pass = require('./passes/web_text_pass');

const noun_fallback = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
const specific_noun = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (t instanceof pos.Noun) {
      //don't overwrite known forms...
      if (t.pos.Person || t.pos.Place || t.pos.Value || t.pos.Date || t.pos.Organization) {
        continue;
      }
      if (t.is_person()) {
        terms[i] = assign(t, 'Person', 'is_person');
      } else if (t.is_place()) {
        terms[i] = assign(t, 'Place', 'is_place');
      } else if (t.is_value()) {
        terms[i] = assign(t, 'Value', 'is_value');
      } else if (t.is_date()) {
        terms[i] = assign(t, 'Date', 'is_date');
      } else if (t.is_organization()) {
        terms[i] = assign(t, 'Organization', 'is_organization');
      }
    }
  }
  return terms;
};

const tagger = function(s, options) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = lexicon_pass(s.terms, options);
  s.terms = multiple_pass(s.terms);
  s.terms = regex_pass(s.terms);
  s.terms = interjection_fixes(s.terms);
  s.terms = web_text_pass(s.terms);
  //sentence-level rules
  //(repeat these steps a couple times, to wiggle-out the grammar)
  for(let i = 0; i < 3; i++) {
    s.terms = grammar_pass(s);
    s.terms = specific_noun(s.terms);
    s.terms = ambiguous_dates(s.terms);
    s.terms = possessive_pass(s.terms);
    s.terms = lump_two(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = lump_three(s.terms);
  }
  s.terms = conditional_pass(s.terms);
  s.terms = quotation_pass(s.terms);
  s.terms = contraction_pass(s.terms);
  s.terms = question_pass(s.terms);
  return s.terms;
};

module.exports = tagger;
