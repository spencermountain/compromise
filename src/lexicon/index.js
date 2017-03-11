'use strict';
//to change these packed files, edit ./data then run `node scripts/pack.js`
const unpack = require('./efrt-unpack');
let path = './_packed/_';
const files = {
  tags: [
    [require(path + 'adjectives'), 'Adjective'],
    [require(path + 'cities'), 'City'],
    [require(path + 'countries'), 'Country'],
    [require(path + 'demonyms'), 'Demonym'],
    [require(path + 'expressions'), 'Expression'],
    [require(path + 'female'), 'FemaleName'],
    [require(path + 'lastnames'), 'LastName'],
    [require(path + 'male'), 'MaleName'],
    [require(path + 'organizations'), 'Organization'],
    [require(path + 'phrasals'), 'PhrasalVerb'],
    [require(path + 'sportsTeams'), 'SportsTeam'],
  ],
  util: {
    orgWords: require(path + 'orgWords'),
    uncountable: require(path + 'uncountables'),
  }
};

// console.time('trie-unpack');
//turn these compressed strings into queryable tries (using `nlp-compromise/efrt` library)
files.tags.forEach((arr) => {
  arr[0] = unpack(arr[0]);
});
// console.timeEnd('trie-unpack');

module.exports = files;
// console.log(files.tags[0].has('aloof'));
console.log(files.tags[1][0].has('taipei'));
console.log(files.tags[1][0].has('mexico'));
