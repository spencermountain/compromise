//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form in ../_packed
let lex = {};

//add-in the generic, flat word-lists
const basic = [
  [require('./basic/adjectives'), 'Adjective'],
  [require('./basic/convertables'), 'Comparable'],
  [require('./basic/adverbs'), 'Adverb'],
  //nouns
  [require('./basic/singulars'), 'Singular'],
  [require('./basic/professions'), 'Noun'],
  [require('./basic/sportsTeams'), 'SportsTeam'],
  [require('./basic/uncountables'), 'Uncountable'],
  [require('./basic/places'), 'Place'],
  [require('./basic/pronouns'), 'Pronoun'],
  [require('./basic/possessives'), 'Possessive'], //+pronoun?
  [require('./basic/cities'), 'City'],
  [require('./basic/regions'), 'Region'],
  [require('./basic/organizations'), 'Organization'],
  [require('./basic/countries'), 'Country'],
  [require('./basic/currencies'), 'Currency'],
  [require('./basic/demonyms'), 'Demonym'],
  [require('./basic/units'), 'Unit'],
  //dates
  [require('./basic/days'), 'WeekDay'],
  [require('./basic/holidays'), 'Holiday'],
  [require('./basic/months'), 'Month'],
  [require('./basic/durations'), 'Duration'],
  [require('./basic/times'), 'Time'],
  //people
  [require('./basic/firstnames'), 'FirstName'],
  [require('./basic/lastnames'), 'LastName'],
  [require('./basic/maleNames'), 'MaleName'],
  [require('./basic/femaleNames'), 'FemaleName'],
  [require('./basic/honorifics'), 'Honorific'],
  [require('./basic/people'), 'Person'],
  //verbs
  [require('./basic/infinitives'), 'Infinitive'],
  [require('./basic/verbs'), 'Verb'],
  [require('./basic/phrasals'), 'PhrasalVerb'],
  [require('./basic/modals'), 'Modal'],
  //misc
  [require('./basic/expressions'), 'Expression'],
  [require('./basic/prepositions'), 'Preposition'],
  [require('./basic/determiners'), 'Determiner'],
  [require('./basic/conjunctions'), 'Conjunction']
];
for (let i = 0; i < basic.length; i++) {
  let list = basic[i][0];
  for (let o = 0; o < list.length; o++) {
    lex[list[o]] = basic[i][1];
  }
}

//conjugate, inflect, derive forms
// lex = preBuild(lex);

module.exports = lex;
// console.log(Object.keys(lex).length);
// console.log(lex['valentines']);
