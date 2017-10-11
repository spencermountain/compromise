//turn 'quick' into 'quickest'
'use strict';
const do_rules = [/ght$/, /nge$/, /ough$/, /ain$/, /uel$/, /[au]ll$/, /ow$/, /oud$/, /...p$/];
const dont_rules = [/ary$/];
const irregulars = require('../../../world/more-data/irregularAdjectives').toSuperlative;

const transforms = [
  {
    reg: /y$/i,
    repl: 'iest'
  },
  {
    reg: /([aeiou])t$/i,
    repl: '$1ttest'
  },
  {
    reg: /([aeou])de$/i,
    repl: '$1dest'
  },
  {
    reg: /nge$/i,
    repl: 'ngest'
  },
  {
    reg: /([aeiou])te$/i,
    repl: '$1test'
  }
];

const to_superlative = function(str) {
  //irregulars
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //known transforms
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  //dont-rules
  for (let i = 0; i < dont_rules.length; i++) {
    if (dont_rules[i].test(str) === true) {
      return null;
    }
  }
  //do-rules
  for (let i = 0; i < do_rules.length; i++) {
    if (do_rules[i].test(str) === true) {
      if (str.charAt(str.length - 1) === 'e') {
        return str + 'st';
      }
      return str + 'est';
    }
  }
  return str + 'est';
};

module.exports = to_superlative;
// console.log(to_superlative("great"))
