'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
// const unpack = require('/home/spencer/nlp/efrt/src/unpack');
const tags = {
  Adjective: require('./_packed/_adjectives'),
  Adverb: require('./_packed/_adverbs'),
  Place: require('./_packed/_airports'),
  City: require('./_packed/_cities'),
  Country: require('./_packed/_countries'),
  Demonym: require('./_packed/_demonyms'),
  Expression: require('./_packed/_expressions'),
  FirstName: require('./_packed/_firstnames'),
  FemaleName: require('./_packed/_female'),
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

//find all multi-word terms
const multiples = function() {
  let all = {};
  [
    'Adverb',
    'City',
    'Country',
    'Expression',
    'Holiday',
    'Noun',
    'Organization',
    'SportsTeam',
  ].forEach((k) => {
    let obj = tags[k]._cache;
    const words = Object.keys(obj);
    for(let i = 0; i < words.length; i++) {
      if (words[i].match(' ')) {
        all[words[i]] = k;
      }
    }
  });
  return all;
};

module.exports = {
  lookup: lookup,
  utils: utils,
  multiples: multiples,
};
