//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form
var lex = require('./words/misc');

//add-in the generic, flat word-lists
var data = [
  //nouns
  [require('./words/nouns/singulars'), 'Singular'],
  [require('./words/nouns/professions'), 'Noun'],
  [require('./words/nouns/sportsTeams'), 'SportsTeam'],
  [require('./words/nouns/uncountables'), 'Uncountable'],
  [require('./words/nouns/pronouns'), 'Pronoun'],
  [require('./words/nouns/organizations'), 'Organization'],
  [require('./words/nouns/demonyms'), 'Demonym'],
  [require('./words/possessives'), 'Possessive'], //+pronoun?
  [require('./words/currencies'), 'Currency'],
  [require('./words/units'), 'Unit'],

  [require('./words/places/countries'), 'Country'],
  [require('./words/places/regions'), 'Region'],
  [require('./words/places/places'), 'Place'],
  [require('./words/places/cities'), 'City'],
  //dates
  [require('./words/dates/days'), 'WeekDay'],
  [require('./words/dates/dates'), ['Date', 'Noun']],
  [require('./words/dates/holidays'), 'Holiday'],
  [require('./words/dates/months'), 'Month'],
  [require('./words/dates/durations'), 'Duration'],
  [require('./words/dates/times'), 'Time'],
  //people
  [require('./words/people/firstnames'), 'FirstName'],
  [require('./words/people/lastnames'), 'LastName'],
  [require('./words/people/maleNames'), 'MaleName'],
  [require('./words/people/femaleNames'), 'FemaleName'],
  [require('./words/people/honorifics'), 'Honorific'],
  [require('./words/people/people'), 'Person'],
  //verbs
  [require('./words/verbs/infinitives'), 'Infinitive'],
  [require('./words/verbs/verbs'), 'Verb'],
  [require('./words/verbs/phrasals'), 'PhrasalVerb'],
  [require('./words/verbs/modals'), 'Modal'],
  //adjectives
  [require('./words/adjectives/adjectives'), 'Adjective'],
  [require('./words/adjectives/comparables'), 'Comparable'],
  [require('./words/adverbs'), 'Adverb'],
  //misc
  [require('./words/expressions'), 'Expression'],
  [require('./words/prepositions'), 'Preposition'],
  [require('./words/determiners'), 'Determiner'],
  [require('./words/conjunctions'), 'Conjunction']
];
for (var i = 0; i < data.length; i++) {
  var list = data[i][0];
  for (var o = 0; o < list.length; o++) {
    //log duplicates
    // if (lex[list[o]]) {
    //   console.log(list[o] + '  ' + lex[list[o]] + ' ' + data[i][1]);
    // }
    lex[list[o]] = data[i][1];
  }
}

module.exports = lex;
// console.log(Object.keys(lex).length);
// console.log(lex['is']);
