'use strict';
const word_rules = require('./rules/word_rules');
const assign = require('../assign');

//word-rules that run on '.text', not '.normal'
const punct_rules = [
  ['^[12]?[0-9]\:[0-9]{2}( am| pm)?$', 'DA'],
];

const regex_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].tag !== '?') {
      continue;
    }
    //regexes that involve punctuation
    for(let o = 0; o < punct_rules.length; o++) {
      if (terms[i].text.match(punct_rules[o].reg)) {
        terms[i] = assign(terms[i], punct_rules[o].pos, 'rules_pass_' + o);
        continue;
      }
    }
    //bigger list of regexes on normal
    for (let o = 0; o < word_rules.length; o++) {
      if (terms[i].normal.match(word_rules[o].reg)) {
        terms[i] = assign(terms[i], word_rules[o].pos, 'rules_pass_' + o);
        continue;
      }
    }
  }

  return terms;
};

module.exports = regex_pass;
