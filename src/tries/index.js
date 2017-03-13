'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const tags = {
  Adjective: require('./_packed/_adjectives'),
  Adverb: require('./_packed/_adverbs'),
  Place: require('./_packed/_airports'),
  City: require('./_packed/_cities'),
  Country: require('./_packed/_countries'),
  Demonym: require('./_packed/_demonyms'),
  Expression: require('./_packed/_expressions'),
  FemaleName: require('./_packed/_female'),
  FirstName: require('./_packed/_firstnames'),
  Holiday: require('./_packed/_holidays'),
  LastName: require('./_packed/_lastnames'),
  MaleName: require('./_packed/_male'),
  Noun: require('./_packed/_nouns'),
  Organization: require('./_packed/_organizations'),
  SportsTeam: require('./_packed/_sportsTeams'),
  Actor: require('./_packed/_professions'),
  Preposition: require('./_packed/_prepositions'),
};

const utils = {
  orgWords: require('./_packed/_orgWords'),
  uncountable: require('./_packed/_uncountables'),
  phrasals: require('./_packed/_phrasals'),
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
