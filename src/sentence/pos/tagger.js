//part-of-speech tagging
'use strict';
const contractions = require('./contractions');
const lexicon = require('../../lexicon.js');
const word_rules = require('./word_rules');
const grammar_rules = require('./grammar_rules');
const fancy_lumping = require('./fancy_lumping');
const phrasal_verbs = require('./phrasal_verbs');
const fns = require('../../fns');
const pos = require('./parts_of_speech');

//swap the Term object with a proper Pos class
const assign = function (t, tag, reason) {
  let old_pos = t.pos;
  let P = pos.classMapping[tag] || pos.Term;
  let implicit = t.implicit;
  t = new P(t.text, tag);
  t.reason = reason;
  t.implicit = implicit;
  t.pos = fns.extend(t.pos, old_pos);
  return t;
};

//consult lexicon for this known-word
const lexicon_pass = function(terms) {
  return terms.map(function(t) {
    //check lexicon straight-up
    if (lexicon[t.normal] !== undefined) {
      return assign(t, lexicon[t.normal], 'lexicon_pass');
    }
    //try to match it without a prefix - eg. outworked -> worked
    if (t.normal.match(/^(over|under|out|-|un|re|en).{4}/)) {
      const attempt = t.normal.replace(/^(over|under|out|.*?-|un|re|en)/, '');
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

//set POS for capitalised words
const capital_signals = function(terms) {
  //first words need careful rules
  if (terms[0].is_acronym()) {
    terms[0] = assign(terms[0], 'Noun', 'acronym');
  }
  //non-first-word capitals are nouns
  for (let i = 1; i < terms.length; i++) {
    if (terms[i].is_capital() || terms[i].is_acronym()) {
      terms[i] = assign(terms[i], 'Noun', 'capital_signal');
    }
  }
  return terms;
};

//regex hints for words/suffixes
const word_rules_pass = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    if (terms[i].tag !== '?') {
      continue;
    }
    for (let o = 0; o < word_rules.length; o++) {
      if (terms[i].normal.length > 4 && terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass_' + o);
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
    //if the tags match (but it's not a hidden contraction)
    if (last !== null && t.tag === last && !t.implicit) {
      new_terms[new_terms.length - 1].text += ' ' + t.text;
      new_terms[new_terms.length - 1].normalize();
    } else {
      new_terms.push(t);
    }
    last = t.tag;
  }
  return new_terms;
};


//hints from the sentence grammar
const grammar_rules_pass = function(s) {
  let tags = s.tags();
  for(let i = 0; i < s.terms.length; i++) {
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
        terms[i] = assign(t, 'Person');
      } else if (t.is_place()) {
        terms[i] = assign(t, 'Place');
      } else if (t.is_value()) {
        terms[i] = assign(t, 'Value');
      } else if (t.is_date()) {
        terms[i] = assign(t, 'Date');
      } else if (t.is_organisation()) {
        terms[i] = assign(t, 'Organisation');
      }
    }
  }
  return terms;
};

const tagger = function(s) {
  //word-level rules
  s.terms = capital_signals(s.terms);
  s.terms = contractions.easy_ones(s.terms);
  s.terms = lexicon_pass(s.terms);
  s.terms = word_rules_pass(s.terms);
  //repeat these steps a couple times, to wiggle-out the grammar
  for(let i = 0; i < 2; i++) {
    s.terms = grammar_rules_pass(s);
    s.terms = chunk_neighbours(s.terms);
    s.terms = noun_fallback(s.terms);
    s.terms = phrasal_verbs(s.terms);
    s.terms = specific_pos(s.terms);
    s.terms = contractions.hard_ones(s.terms);
    s.terms = fancy_lumping(s.terms);
  }
  return s.terms;
};

module.exports = tagger;
