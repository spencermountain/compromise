'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const files = {
  adjectives: require(path + 'adjectives'),
  cities: require(path + 'cities'),
  countries: require(path + 'countries'),
  demonyms: require(path + 'demonyms'),
  expressions: require(path + 'expressions'),
  female: require(path + 'female'),
  lastnames: require(path + 'lastnames'),
  male: require(path + 'male'),
  organizations: require(path + 'organizations'),
  orgWords: require(path + 'orgWords'),
  phrasals: require(path + 'phrasals'),
  sportsTeams: require(path + 'sportsTeams'),
  uncountables: require(path + 'uncountables'),
};
console.time('trie');
Object.keys(files).forEach((k) => {
  files[k] = unpack(files[k]);
});
console.timeEnd('trie');

module.exports = unpack;
// console.log(files.adjectives.has('aloof'));
// console.log(files.cities.has('taipei'));
