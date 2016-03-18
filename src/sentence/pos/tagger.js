//part-of-speech tagging
'use strict';
const word_rules = require('./word_rules');
const grammar_rules = require('./grammar_rules');
const fancy_lumping = require('./fancy_lumping');
const phrasal_verbs = require('./phrasal_verbs');
const interjection_fixes = require('./interjection_fixes');
const lexicon_pass = require('./lexicon_pass');
const capital_signals = require('./capital_signals');
const pos = require('./parts_of_speech');
const assign = require('./assign');

//regex hints for words/suffixes
const word_rules_pass = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    if (terms[i].tag !== '?') {
      continue;
    }
    for (let o = 0; o < word_rules.length; o++) {
      if (terms[i].text.length > 3 && terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass_' + o);
        break;
      }
    }
  }
  return terms;
};

const should_chunk = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //if A has a comma, don't chunk it
  if (a.has_comma()) {
    return false;
  }
  //don't chunk non-word things with word-things
  if (a.is_word() === false || b.is_word() === false) {
    return false;
  }
  //dont chunk these pos
  const dont_chunk = {
    Expression: true
  };
  if (dont_chunk[a.tag] || dont_chunk[b.tag]) {
    return false;
  }
  //dont chunk contractions (again)
  if (a.expansion || b.expansion) {
    return false;
  }
  if (a.tag === b.tag) {
    return true;
  }
  return false;
};

//turn [noun, noun..] into [noun..]
const chunk_neighbours = function(terms) {
  let new_terms = [];
  let last_one = null;
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    //if the tags match (but it's not a hidden contraction)
    if (should_chunk(last_one, t)) {
      new_terms[new_terms.length - 1].text += ' ' + t.text;
      new_terms[new_terms.length - 1].normalize();
    } else {
      new_terms.push(t);
    }
    last_one = t;
  }
  return new_terms;
};

//tests a subset of terms against a array of tags
const hasTags = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < tags.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      return false;
    }
  }
  return true;
};

//hints from the sentence grammar
const grammar_rules_pass = function(s) {
  for(let i = 0; i < s.terms.length; i++) {
    for(let o = 0; o < grammar_rules.length; o++) {
      let rule = grammar_rules[o];
      //does this rule match
      let terms = s.terms.slice(i, i + rule.before.length);
      if (hasTags(terms, rule.before)) {
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
    if (terms[i].tag === '?' && terms[i].normal.match(/[a-z]/)) {
      terms[i] = assign(terms[i], 'Noun', 'fallback');
    }
  }
  return terms;
};

//turn nouns into person/place
const specific_pos = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (t instanceof pos.Noun) {
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
  // s.terms = contractions.easy_ones(s.terms);
  s.terms = lexicon_pass(s.terms, options);
  s.terms = word_rules_pass(s.terms);
  s.terms = interjection_fixes(s.terms);
  //repeat these steps a couple times, to wiggle-out the grammar
  for(let i = 0; i < 1; i++) {
    s.terms = grammar_rules_pass(s);
    s.terms = chunk_neighbours(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = phrasal_verbs(s.terms);
    s.terms = specific_pos(s.terms);
    // s.terms = contractions.hard_ones(s.terms);
    s.terms = fancy_lumping(s.terms);
  }
  return s.terms;
};

module.exports = tagger;
