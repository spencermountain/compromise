//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form in ../_packed
const efrt = require('efrt');
const fs = require('fs');

let lex = {};
//first, add the compromise-generated-wordlists (inflections, conjugations, derivations)
const computed = [
  require('./shared/orgWords'), //nouns
  require('./shared/abbreviations'),
  require('./computed/nouns'), //plural/singular
  require('./computed/adjectives'), //comparative/superlative/verb-form
  require('./computed/verbs'), //conjugated
];
for (let i = 0; i < computed.length; i++) {
  let keys = Object.keys(computed[i]);
  for (let o = 0; o < keys.length; o++) {
    lex[keys[o]] = computed[i][keys[o]];
  }
}

//add-in the generic, flat word-lists
const basic = [
  [require('./basic/adjectives'), 'Adjective'],
  [require('./basic/adverbs'), 'Adverb'],
  //nouns
  [require('./basic/professions'), 'Doer'],
  [require('./basic/sportsTeams'), 'SportsTeam'],
  [require('./basic/uncountables'), 'Uncountable'],
  [require('./basic/places'), 'Place'],
  [require('./basic/pronouns'), 'Pronoun'],
  [require('./basic/possessives'), 'Possessive'], //+pronoun?
  [require('./basic/cities'), 'City'],
  [require('./basic/organizations'), 'Organization'],
  [require('./basic/countries'), 'Country'],
  [require('./basic/currencies'), 'Currency'],
  [require('./basic/demonyms'), 'Demonym'],
  [require('./basic/units'), 'Unit'],
  //dates
  [require('./basic/days'), 'Date'],
  [require('./basic/holidays'), 'Holiday'],
  [require('./basic/months'), 'Month'],
  [require('./basic/durations'), 'Duration'],
  //people
  [require('./basic/firstnames'), 'FirstName'],
  [require('./basic/lastnames'), 'LastName'],
  [require('./basic/maleNames'), 'MaleName'],
  [require('./basic/femaleNames'), 'FemaleName'],
  [require('./basic/honorifics'), 'Honorific'],
  [require('./basic/people'), 'Person'],
  //verbs
  [require('./basic/phrasals'), 'PhrasalVerb'],
  [require('./basic/modals'), 'Modal'],
  //misc
  [require('./basic/expressions'), 'Expression'],
  [require('./basic/prepositions'), 'Preposition'],
  [require('./basic/determiners'), 'Determiner'],
  [require('./basic/conjunctions'), 'Conjunction'],
];
for (let i = 0; i < basic.length; i++) {
  let list = basic[i][0];
  for (let o = 0; o < list.length; o++) {
    lex[list[o]] = basic[i][1];
  }
}

module.exports = lex;
// console.log(Object.keys(lex).length);
