'use strict';

//list of inconsistent parts-of-speech
const conflicts = [
  //top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email'],
  //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //things that can't be plural
  ['Plural', 'Singular'],
  ['Plural', 'Pronoun'],
  ['Plural', 'Person'],
  ['Plural', 'Organization'],
  ['Plural', 'Currency'],
  ['Plural', 'Ordinal'],
  //exlusive-people
  ['MalePerson', 'FemalePerson'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['Infinitive', 'Gerund', 'Pluperfect', 'FuturePerfect'],
  //tenses
  ['PastTense', 'PresentTense', 'PerfectTense'],
  //non-infinitive
  ['Infinitive', 'PastTense'],
  ['Infinitive', 'PresentTense'],
  //non-gerund
  ['Gerund', 'PastTense'],
  ['Gerund', 'PresentTense'],
  //more verbs
  ['Copula', 'Modal'],
  //date
  ['Month', 'Day', 'Year', 'Duration'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  // ['Month', 'Verb', 'Person'],
  //phrases
  ['NounPhrase', 'VerbPhrase', 'AdjectivePhrase'],
  //a/an -> 1
  ['Value', 'Determiner']
];

const find = (tag) => {
  let arr = [];
  for(let i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(tag) !== -1) {
      arr = arr.concat(conflicts[i]);
    }
  }
  return arr.filter((t) => t !== tag);
};

module.exports = find;

// console.log(find('Person'));
