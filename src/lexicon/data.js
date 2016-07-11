'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
let files = {
  'people': [
    'firstnames'
  ],
  'values': [
    'currencies',
    'numbers'
  ],
  dates: [
    'dates',
    'holidays'
  ],
  'nouns': [
    'professions',
    'abbreviations',
    'demonyms',
    'irregular_plurals',
    'places',
    'uncountables'
  ],
  'organizations': [
    'organizations',
    'groups'
  ],
  'adjectives': [
    'adjectives',
    'superlatives'
  ],
  'verbs': [
    'irregular_verbs',
    'phrasal_verbs',
    'verbs'
  ],
  misc: [
    'misc'
  ]
};
let data = {};
Object.keys(files).forEach((k) => {
  files[k].forEach((s) => {
    data[s] = require('./' + k + '/' + s);
  });
});
module.exports = data;
