'use strict';
//a lexicon is a giant object of known words

const data = require('./data');
const fns = require('./fns');
let lexicon = {};

const addObj = (o) => {
  fns.extendObj(lexicon, o)
};
const addArr = (arr, tag) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//let a rip.
addObj(data.misc)
addObj(data.abbreviations)
addObj(data.firstnames)

addArr(data.places.airports, 'Place')
addArr(data.places.cities, 'City')
addArr(data.places.countries, 'Country')
addArr(data.uncountables, 'Noun')
addArr(data.organizations, 'Organization')
addArr(data.groups, 'Noun')
addArr(data.adjectives, 'Adjective')
addArr(data.superlatives, 'Adjective')
addArr(data.currencies, 'Currency');
addArr(data.phrasal_verbs, 'Verb')
addArr(data.verbs, 'Verb')

//number-words are well-structured
let obj = data.numbers.ordinal
addArr(Object.keys(obj.ones), 'Value')
addArr(Object.keys(obj.teens), 'Value')
addArr(Object.keys(obj.tens), 'Value')
addArr(Object.keys(obj.multiples), 'Value')
obj = data.numbers.cardinal
addArr(Object.keys(obj.ones), 'Value')
addArr(Object.keys(obj.teens), 'Value')
addArr(Object.keys(obj.tens), 'Value')
addArr(Object.keys(obj.multiples), 'Value')
addArr(Object.keys(data.numbers.prefixes), 'Value')

//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'SingularNoun')
addArr(Object.keys(data.irregular_plurals.toSingle), 'PluralNoun')

//dates are well-structured
addArr(data.dates.days, 'Date')
addArr(data.dates.months, 'Date')
addArr(data.dates.durations, 'Date')
addArr(data.dates.relative, 'Date')
addArr(Object.keys(data.holidays), 'Date')
addArr(data.professions, 'Actor') //?
addArr(data.demonyms, 'Demonym') //?

//irregular verbs
let verbForms = {
  past: 'PastTense',
  gerund: 'GerundVerb',
  present: 'PresentTense',
  perfect: 'PerfectTense',
  pluperfect: 'PluperfectTense',
  future_perfect: 'FuturePerfect',
  actor: 'Actor'
}
Object.keys(data.irregular_verbs).forEach((k) => {
  lexicon[k] = 'InfinitiveVerb'
  Object.keys(data.irregular_verbs[k]).forEach((k2) => {
    lexicon[verbForms[k2]] = data.irregular_verbs[k][k2]
  })
})

module.exports = lexicon;

// console.log(Object.keys(data));
// console.log(data.misc);
console.log(lexicon.the)
