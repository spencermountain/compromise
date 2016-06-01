'use strict';
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

const is_possessive = function(terms, x) {
  //some parts-of-speech can't be possessive
  if (terms[x].pos['Pronoun']) {
    return false;
  }
  let nextWord = terms[x + 1];
  //last word is possessive  - "better than spencer's"
  if (!nextWord) {
    return true;
  }
  //next word is 'house'
  if (nextWord.pos['Noun']) {
    return true;
  }
  //rocket's red glare
  if (nextWord.pos['Adjective'] && terms[x + 2] && terms[x + 2].pos['Noun']) {
    return true;
  }
  //next word is an adjective
  if (nextWord.pos['Adjective'] || nextWord.pos['Verb'] || nextWord.pos['Adverb']) {
    return false;
  }
  return false;
};

module.exports = is_possessive;
