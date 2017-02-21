'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
module.exports = {
  'firstnames': require('./people/firstnames'),
  'lastnames': require('./people/lastnames'),
  'notable_people': require('./people/notable'),
  'titles': require('./people/titles'),

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
  'nouns': require('./nouns/nouns'),

  'organizations': require('./organizations/organizations'),
  'sportsTeams': require('./organizations/sportsTeams'),
  'bands': require('./organizations/bands'),
  'orgWords': require('./organizations/orgWords'),

  'adjectives': require('./adjectives/adjectives'),
  'superlatives': require('./adjectives/superlatives'),
  'verbConverts': require('./adjectives/verbConverts'),

  'irregular_verbs': require('./verbs/irregular_verbs'),
  'verbs': require('./verbs/verbs'),

  'misc': require('./misc/misc'),
};
