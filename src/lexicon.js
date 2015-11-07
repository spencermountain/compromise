//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');

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
let verb_forms = {
  infinitive: 'VBP',
  past: 'VBD',
  gerund: 'VBG',
  present: 'VBZ',
  actor: 'NNA',
  participle: 'VBN',
};
const verbs = require('./data/verbs.js');
for (let i = 0; i < verbs.length; i++) {
  const c = verb_conjugate(verbs[i]);
  Object.keys(c).forEach(function(k) {
    if (k && verb_forms[k]) {
      lexicon[c[k]] = verb_forms[k];
    }
  });
}
//irregular verbs
require('./data/verb_irregulars.js').forEach(function(o) {
  Object.keys(o).forEach(function(k) {
    if (k && verb_forms[k]) {
      lexicon[o[k]] = verb_forms[k];
    }
  });
});

let orgs = require('./data/organisations.js');
addArr(orgs.organisations, 'Noun');
addArr(orgs.suffixes, 'Noun');
let places = require('./data/places.js');
addArr(places.countries, 'Noun');
addArr(places.cities, 'Noun');

addArr(require('./data/abbreviations.js').abbreviations, 'NNAB');
addArr(require('./data/adjectives.js'), 'Adjective');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'NNAB');
addArr(require('./data/uncountables.js'), 'Noun');
addArr(require('./data/dates.js'), 'Value');
addArr(require('./data/numbers.js'), 'Value');
//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Noun');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'NNS');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));

//just in case
lexicon[false] = undefined;
lexicon[true] = undefined;
lexicon[undefined] = undefined;
lexicon[null] = undefined;
lexicon[''] = undefined;

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
console.log(lexicon['canada'] === 'Noun');
// console.log(lexicon['the']);

module.exports = lexicon;
