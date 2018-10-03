'use strict';
const regs = require('./rules/regex_list');
const suffixes = require('./rules/suffix_lookup');

const misc = [
  //slang things
  [/^(lol)+[sz]$/, 'Expression'], //lol
  [/^ma?cd[aeiou]/, 'LastName'], //macdonell - Last patterns https://en.wikipedia.org/wiki/List_of_family_name_affixes
  //starting-ones
  [/^[\-\+]?[0-9][0-9,]*(\.[0-9])*$/, 'Cardinal'], //like 5
  [/^(un|de|re)\\-[a-z]../, 'Verb'],
  [/^[\-\+]?[0-9]+(\.[0-9])*$/, 'NumericValue'],
  [/^https?\:?\/\/[a-z0-9]/, 'Url'], //the colon is removed in normalisation
  [/^www\.[a-z0-9]/, 'Url'],
  [/^(over|under)[a-z]{2,}/, 'Adjective'],
  [/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, 'Date'], // 03-02-89
  //ending-ones
  [/^[0-9]+([a-z]{1,2})$/, 'Value'], //like 5kg
  [/^[0-9][0-9,\.]*(st|nd|rd|r?th)$/, ['NumericValue', 'Ordinal']], //like 5th
  //middle (anywhere)
  [/[a-z]*\\-[a-z]*\\-/, 'Adjective']
];

//straight-up lookup of known-suffixes
const lookup = function(t) {
  const len = t.normal.length;
  let max = 7;
  if (len <= max) {
    max = len - 1;
  }
  for (let i = max; i > 1; i -= 1) {
    let str = t.normal.substr(len - i, len);
    if (suffixes[i][str] !== undefined) {
      // console.log('suffix-match: ' + str);
      return suffixes[i][str];
    }
  }
  return null;
};

//word-regexes indexed by last-character
const regexFn = function(t) {
  let char = t.normal.charAt(t.normal.length - 1);
  if (regs[char] === undefined) {
    return null;
  }
  let arr = regs[char];
  for (let o = 0; o < arr.length; o++) {
    if (arr[o][0].test(t.normal) === true) {
      return arr[o];
    }
  }
  return null;
};

const suffix_step = function(ts) {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //try known suffixes
    let tag = lookup(t);
    if (tag !== null && t.canBe(tag) === true) {
      t.tag(tag, 'suffix-lookup');
      continue;
    }
    //apply regexes by final-char
    tag = regexFn(t);
    if (tag !== null && t.canBe(tag[1]) === true) {
      t.tag(tag[1], 'regex-list: ' + String(tag[0]));
      continue;
    }
    //apply misc regexes
    for (let o = 0; o < misc.length; o++) {
      if (misc[o][0].test(t.normal) === true) {
        tag = misc[o][1];
        if (t.canBe(tag) === true) {
          t.tag(tag, 'misc-regex-' + misc[o][0]);
        }
      }
    }
  }
  return ts;
};

module.exports = suffix_step;
