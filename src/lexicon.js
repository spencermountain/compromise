//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');
const to_comparative = require('./term/adjective/to_comparative.js');
const to_superlative = require('./term/adjective/to_superlative.js');
const to_adverb = require('./term/adjective/to_adverb.js');
const grand_mapping = require('./sentence/pos/parts_of_speech.js').tag_mapping;

const lexicon = {};

const addObj = function(obj) {
  const keys = Object.keys(obj);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

const addArr = function(arr, tag) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
const verbMap = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense',
};

const irregulars = require('./data/irregular_verbs.js');
let verbs = require('./data/verbs.js').concat(Object.keys(irregulars));
for (let i = 0; i < verbs.length; i++) {
  const o = verb_conjugate(verbs[i]);
  Object.keys(o).forEach(function(k) {
    if (k && o[k] && verbMap[k]) {
      lexicon[o[k]] = verbMap[k];
    }
  });
}

let orgs = require('./data/organizations.js');
addArr(orgs.organizations, 'Noun');
addArr(orgs.suffixes, 'Noun');

let places = require('./data/places.js');
addArr(places.countries, 'Place');
addArr(places.cities, 'Place');

require('./data/adjectives.js').forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});
Object.keys(require('./data/convertables.js')).forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
  lexicon[to_adverb(s)] = 'Adverb';
});

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
let dates = require('./data/dates.js');
addArr(dates.days, 'Date');
addArr(dates.months, 'Date');
addArr(dates.durations, 'Date');
addArr(dates.relative, 'Date');

//unpack the numbers
let nums = require('./data/numbers.js');
let all_nums = Object.keys(nums).reduce((arr, k) => {
  arr = arr.concat(Object.keys(nums[k]));
  return arr;
}, []);
addArr(all_nums, 'Value');

//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Person');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));
//add named holidays, like 'easter'
Object.keys(require('./data/holidays.js')).forEach(function(k) {
  lexicon[k] = 'Date';
});

//professions
addArr(require('./data/professions.js'), 'Actor');

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function(k) {
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});

// console.log(lexicon['april fools']);
module.exports = lexicon;
