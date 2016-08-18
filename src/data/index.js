'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
module.exports = {
  'firstnames': require('./people/firstnames'),
  'currencies': require('./values/currencies'),
  'numbers': require('./values/numbers'),
  'ordinalMap': require('./values/ordinalMap'),
  'units': require('./values/units'),
  'dates': require('./dates/dates'),
  'holidays': require('./dates/holidays'),
  'professions': require('./nouns/professions'),
  'abbreviations': require('./nouns/abbreviations'),
  'demonyms': require('./nouns/demonyms'),
  'irregular_plurals': require('./nouns/irregular_plurals'),
  'places': require('./nouns/places'),
  'uncountables': require('./nouns/uncountables'),
  'organizations': require('./organizations/organizations'),
  'groups': require('./organizations/groups'),
  'adjectives': require('./adjectives/adjectives'),
  'superlatives': require('./adjectives/convertable'),
  'irregular_verbs': require('./verbs/irregular_verbs'),
  'phrasal_verbs': require('./verbs/phrasal_verbs'),
  'verbs': require('./verbs/verbs'),
  'misc': require('./misc/misc'),
};
