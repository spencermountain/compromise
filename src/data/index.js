'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
/*@nocompile*/
module.exports = {
  numbers: require('./values/numbers'),
  ordinalMap: require('./values/ordinalMap'),

  irregular_plurals: require('./nouns/irregular_plurals'),
  irregular_verbs: require('./verbs/irregular_verbs'),

  misc: require('./misc/misc')
};
