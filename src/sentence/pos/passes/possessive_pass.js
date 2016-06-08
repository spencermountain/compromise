'use strict';
const assign = require('../assign');
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

//these are always contractions
const blacklist = {
  'it\'s': true,
  'that\'s': true
};

//a possessive means "'s" describes ownership, not a contraction, like 'is'
const is_possessive = function(terms, x) {
  //these are always contractions, not possessive
  if (blacklist[terms[x].normal]) {
    return false;
  }
  //"spencers'" - this is always possessive - eg "flanders'"
  if (terms[x].normal.match(/[a-z]s'$/)) {
    return true;
  }
  //if no apostrophe s, return
  if (!terms[x].normal.match(/[a-z]'s$/)) {
    return false;
  }
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

//tag each term as possessive, if it should
const possessive_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (is_possessive(terms, i)) {
      //if it's not already a noun, co-erce it to one
      if (!terms[i].pos['Noun']) {
        terms[i] = assign(terms[i], 'Noun', 'possessive_pass');
      }
      terms[i].pos['Possessive'] = true;
    }
  }
  return terms;
};
module.exports = possessive_pass;
