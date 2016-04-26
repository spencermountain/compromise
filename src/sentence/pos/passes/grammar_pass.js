'use strict';
const assign = require('../assign');
const grammar_rules = require('./rules/grammar_rules');
const fns = require('../../../fns');
// const match = require('../../match/match');


//tests a subset of terms against a array of tags
const hasTags = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < tags.length; i++) {
    //do a [tag] match
    if (fns.startsWith(tags[i], '[') && fns.endsWith(tags[i], ']')) {
      let pos = tags[i].match(/^\[(.*?)\]$/)[1];
      if (!terms[i].pos[pos]) {
        return false;
      }
    } else if (terms[i].normal !== tags[i]) { //do a text-match
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
          if (rule.after[c]) {
            let newPos = rule.after[c].match(/^\[(.*?)\]$/)[1];
            s.terms[i + c] = assign(s.terms[i + c], newPos, 'grammar_rule  (' + rule.before.join(',') + ')');
          }
        }
        break;
      }
    }
  }
  return s.terms;
};
module.exports = grammar_rules_pass;
