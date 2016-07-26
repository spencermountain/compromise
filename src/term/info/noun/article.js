'use strict';

//chooses an indefinite aricle 'a/an' for a word
const irregulars = {
  'hour': 'an',
  'heir': 'an',
  'heirloom': 'an',
  'honest': 'an',
  'honour': 'an',
  'honor': 'an',
  'uber': 'an' //german u
};
//pronounced letters of acronyms that get a 'an'
const an_acronyms = {
  A: true,
  E: true,
  F: true,
  H: true,
  I: true,
  L: true,
  M: true,
  N: true,
  O: true,
  R: true,
  S: true,
  X: true
};
//'a' regexes
const a_regexs = [
  /^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i
];

const indefinite_article = function(t) {
  let str = t.normal

  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  if (t.info('is_acronym') && an_acronyms.hasOwnProperty(str.substr(0, 1))) {
    return 'an';
  }
  //'a' regexes
  for (let i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return 'a';
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return 'an';
  }
  return 'a';
};

module.exports = indefinite_article;
