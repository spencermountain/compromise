//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');
const to_comparative = require('./term/adjective/to_comparative.js');
const to_superlative = require('./term/adjective/to_superlative.js');
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

let orgs = require('./data/organisations.js');
addArr(orgs.organisations, 'Noun');
addArr(orgs.suffixes, 'Noun');

let places = require('./data/places.js');
addArr(places.countries, 'Place');
addArr(places.cities, 'Place');

require('./data/adjectives.js').forEach(function(s) {
  lexicon[s] = 'Adjective';
  lexicon[to_comparative(s)] = 'Comparative';
  lexicon[to_superlative(s)] = 'Superlative';
});
addObj(require('./data/convertables.js'));

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
addArr(require('./data/dates.js'), 'Date');
addArr(require('./data/numbers.js'), 'Value');
//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Person');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function(k) {
  if (!grand_mapping[lexicon[k]]) {
    // console.log(lexicon[k]);
  }
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});


// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

// console.log(lexicon['once again'] === 'RB');
// console.log(lexicon['seven'] === 'Value');
// console.log(lexicon['sleep'] === 'VBP');
// console.log(lexicon['slept'] === 'VBD');
// console.log(lexicon['sleeping'] === 'VBG');
// console.log(lexicon['canadian'] === 'JJ');
// console.log(lexicon['july'] === 'Value');
// console.log(lexicon[null] === undefined);
// console.log(lexicon['dr'] === 'NNAB');
// console.log(lexicon['sounds'] === 'VBZ');
// console.log(lexicon['look after'] === 'VBP');
// console.log(lexicon['tony'] === 'Noun');
// console.log(lexicon['loaf'] === 'Noun');
// console.log(lexicon['loaves'] === 'NNS');
// console.log(lexicon['he'] === 'PRP');
// console.log(lexicon['canada'] === 'Noun');
// console.log(lexicon['is']);

module.exports = lexicon;
