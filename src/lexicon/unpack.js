'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const files = {
  Adjective: require(path + 'adjectives'),
  City: require(path + 'cities'),
  Country: require(path + 'countries'),
  Demonym: require(path + 'demonyms'),
  Expression: require(path + 'expressions'),
  FemaleName: require(path + 'female'),
  LastName: require(path + 'lastnames'),
  MaleName: require(path + 'male'),
  Organization: require(path + 'organizations'),
  orgWords: require(path + 'orgWords'),
  PhrasalVerb: require(path + 'phrasals'),
  SportsTeam: require(path + 'sportsTeams'),
  uncountable: require(path + 'uncountables'),
};

// console.time('trie-unpack');
//turn these compressed strings into queryable tries (using `nlp-compromise/efrt` library)
Object.keys(files).forEach((k) => {
  files[k] = unpack(files[k]);
});
// console.timeEnd('trie-unpack');

module.exports = files;
// console.log(files.adjectives.has('aloof'));
// console.log(files.cities.has('taipei'));
