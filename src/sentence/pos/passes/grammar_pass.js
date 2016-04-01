'use strict';
const assign = require('../assign');
const grammar_rules = require('./rules/grammar_rules');
// const match = require('../../match/match');


//tests a subset of terms against a array of tags
const hasTags = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(let i = 0; i < tags.length; i++) {
    //do a [tag] match
    if (tags[i].startsWith('[') && tags[i].endsWith(']')) {
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










// //this supports a subset of our matching syntax, for speed/complexity purposes.
// let rules = [
//   {
//     from: ['[Noun]', 'the', '[Noun]'],
//     to: ['Verb', null, null]
//   }
// ];
//
// //determines if this rule matches the terms from index i
// const matches_from = function(i, terms, regs) {
//   for(i = i; i < regs.length; i++) {
//     //try a '[Pos]' match
//     if (regs[i].startsWith('[') && regs[i].endsWith(']')) {
//       let pos = regs[i].match(/^\[(.*?)\]$/)[1];
//       if (!terms[i].pos[pos]) {
//         return false;
//       }
//       continue;
//     }
//     //try a regular text-match
//     if (terms[i].normal !== regs[i]) {
//       return false;
//     }
//   }
//   return true;
// };
//
// const grammar_pass = function(s) {
//   for(let r = 0; r < rules.length; r++) {
//     for(let i = 0; i < s.terms.length; i++) {
//       //stop before the end
//       // if (rules[r].from.length > s.terms.length) {
//       //   break;
//       // }
//       //does this rule match from here?
//       if (matches_from(i, s.terms, rules[r].from)) {
//         //set the new pos tags
//         for(let w = 0; w < rules[r].to.length; w++) {
//           s.terms[i + w] = assign(s.terms[i + w], rules[r].to[w], 'grammar_transforms #' + r);
//         }
//       }
//     }
//   }
//   return s.terms;
// };
//
// module.exports = grammar_pass;
