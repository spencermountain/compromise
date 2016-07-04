'use strict';
const word_rules = require('./rules/word_rules');
const assign = require('../assign');

//word-rules that run on '.text', not '.normal'
const punct_rules = [
  { //'+'
    reg: new RegExp('^[@%^&*+=~-]?$', 'i'),
    pos: 'Symbol',
    reason: 'independent-symbol'
  },
  { //2:54pm
    reg: new RegExp('^[12]?[0-9]\:[0-9]{2}( am| pm)?$', 'i'),
    pos: 'Date',
    reason: 'time_reg'
  },
  { //1999/12/25
    reg: new RegExp('^[0-9]{1,4}[-/][0-9]{1,2}[-/][0-9]{1,4}$', 'i'),
    pos: 'Date',
    reason: 'numeric_date'
  },
  { //3:32
    reg: new RegExp('^[0-9]{1,2}:[0-9]{2}(:[0-9]{2})?', 'i'),
    pos: 'Date',
    reason: 'time'
  },
];

const regex_pass = function(terms) {
  terms.forEach((t, i) => {
    //don't overwrite
    if (terms[i].tag !== '?') {
      return;
    }
    let text = terms[i].text;
    let normal = terms[i].normal;
    //normalize apostrophe s for grammatical purposes
    if (terms[i].has_abbreviation()) {
      let split = terms[i].normal.split(/'/);
      if (split[1] === 's') {
        normal = split[0];
      }
    }
    //regexes that involve punctuation
    for(let o = 0; o < punct_rules.length; o++) {
      if (text.match(punct_rules[o].reg)) {
        terms[i] = assign(terms[i], punct_rules[o].pos, punct_rules[o].rules);
        return;
      }
    }
    //bigger list of regexes on normal
    for (let o = 0; o < word_rules.length; o++) {
      if (normal.match(word_rules[o].reg)) {
        let reason = 'regex #' + o + ' ' + word_rules[o].pos;
        terms[i] = assign(terms[i], word_rules[o].pos, reason);
        return;
      }
    }
  });
  return terms;
};

module.exports = regex_pass;
