'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const tags = {
  Adjective: require(path + 'adjectives'),
  Adverb: require(path + 'adverbs'),
  Place: require(path + 'airports'),
  City: require(path + 'cities'),
  Country: require(path + 'countries'),
  Demonym: require(path + 'demonyms'),
  Expression: require(path + 'expressions'),
  FemaleName: require(path + 'female'),
  FirstName: require(path + 'firstnames'),
  Holiday: require(path + 'holidays'),
  LastName: require(path + 'lastnames'),
  MaleName: require(path + 'male'),
  Organization: require(path + 'organizations'),
  SportsTeam: require(path + 'sportsTeams'),
  Actor: require(path + 'professions'),
  Preposition: require(path + 'prepositions'),
};

const utils = {
  orgWords: require(path + 'orgWords'),
  uncountable: require(path + 'uncountables'),
  phrasals: require(path + 'phrasals'),
};

// console.time('trie-unpack');
//turn these compressed strings into queryable tries (using `nlp-compromise/efrt` library)
const keys = Object.keys(tags);
keys.forEach((tag) => {
  tags[tag] = unpack(tags[tag]);
  tags[tag].cache();
});
Object.keys(utils).forEach((k) => {
  utils[k] = unpack(utils[k]);
  utils[k].cache();
});
// console.timeEnd('trie-unpack');

const lookup = function(str) {
  //other ones
  if (utils.uncountable.has(str)) {
    return 'Noun';
  }
  if (utils.orgWords.has(str)) {
    return 'Noun';
  }
  for(let i = 0; i < keys.length; i++) {
    if (tags[keys[i]].has(str)) {
      return keys[i];
    }
  }
  return null;
};

//same as regular lookup, but if we know it's two-words
const lookupMulti = function(str) {
  const single = {
    'Adjective': true,
    'Place': true,
    'Demonyms': true,
    'FemaleName': true,
    'LastName': true,
    'MaleName': true,
    'Professions': true,
  };
  if (utils.orgWords.has(str)) {
    return 'Noun';
  }
  for(let i = 0; i < keys.length; i++) {
    if (single[keys[i]]) {
      continue;
    }
    if (tags[keys[i]].has(str)) {
      return keys[i];
    }
  }
  return null;
};

module.exports = {
  lookup: lookup,
  utils: utils,
  lookupMulti: lookupMulti,
};
// console.time('trie-query');
// console.log(lookup('aloof'));
// console.timeEnd('trie-query');
// console.log(lookup('taipei'));
// console.log(lookup('gerald'));
// console.log(lookup('mexico'));
