'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const tags = {
  Adjective: require(path + 'adjectives'),
  City: require(path + 'cities'),
  Country: require(path + 'countries'),
  Demonym: require(path + 'demonyms'),
  Expression: require(path + 'expressions'),
  FemaleName: require(path + 'female'),
  LastName: require(path + 'lastnames'),
  MaleName: require(path + 'male'),
  Organization: require(path + 'organizations'),
  PhrasalVerb: require(path + 'phrasals'),
  SportsTeam: require(path + 'sportsTeams'),
};

const utils = {
  orgWords: require(path + 'orgWords'),
  uncountable: require(path + 'uncountables'),
};

// console.time('trie-unpack');
//turn these compressed strings into queryable tries (using `nlp-compromise/efrt` library)
const keys = Object.keys(tags);
keys.forEach((tag) => {
  tags[tag] = unpack(tags[tag]);
});
// console.timeEnd('trie-unpack');

const lookup = function(str) {
  for(let i = 0; i < keys.length; i++) {
    if (tags[keys[i]].has(str)) {
      return keys[i];
    }
  }
  return null;
};

module.exports = {
  lookup: lookup
};
// console.time('trie-query');
// console.log(lookup('aloof'));
// console.timeEnd('trie-query');
// console.log(lookup('taipei'));
// console.log(lookup('gerald'));
// console.log(lookup('mexico'));
