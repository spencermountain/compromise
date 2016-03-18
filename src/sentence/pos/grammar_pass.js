'use strict';
const assign = require('./assign');
const match = require('../../match/match');

let rules = [
  {
    from: ['[Noun]', 'the', '[Noun]'],
    to: ['Verb', null, null]
  }
];

const grammar_pass = function(s) {
  // for(let i = 0; i < rules.length; i++) {
  //   let results = match.findAll(s.terms, rules[i].from, {});
  //   if (results) {
  //     //set their pos tags
  //     for(let r = 0; r < results.length; r++) {
  //       for(let o = 0; o < results[r].terms.length; o++) {
  //         if (rules[i].to[o]) {
  //           let obj = {};
  //           obj[rules[i].to[o]] = true;
  //           results[r].terms[o].pos = obj;
  //         // results[r].terms[o] = assign(results[r].terms[o], rules[i].to[o], 'grammar_matches' + i);
  //         }
  //       }
  //
  //     }
  //   }
  // }
  return s.terms;
};

module.exports = grammar_pass;
