'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
module.exports = {
  'notable_people': require('./people/notable'),
  'titles': require('./people/titles'),

  'currencies': require('./values/currencies'),
  'numbers': require('./values/numbers'),
  'ordinalMap': require('./values/ordinalMap'),
  'units': require('./values/units'),
  'dates': require('./dates/dates'),

  'abbreviations': require('./nouns/abbreviations'),
  'irregular_plurals': require('./nouns/irregular_plurals'),
  // 'nouns': require('./nouns/nouns'),

  'superlatives': require('./adjectives/superlatives'),
  'verbConverts': require('./adjectives/verbConverts'),

  'irregular_verbs': require('./verbs/irregular_verbs'),
  'verbs': require('./verbs/verbs'),

  'misc': require('./misc/misc'),
};
