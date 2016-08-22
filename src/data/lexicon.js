'use strict';
//a lexicon is a giant object of known words
const data = require('./index');
const fns = require('./fns');
const Term = require('../term/term');

let lexicon = {};

const addObj = (o) => {
  fns.extendObj(lexicon, o);
};
const addArr = (arr, tag) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    // if (lexicon[arr[i]]) {
    // console.log('-' + arr[i] + '    ' + lexicon[arr[i]] + '->' + tag)
    // }
    lexicon[arr[i]] = tag;
  }
};
//let a rip.
addObj(data.abbreviations);
addObj(data.firstnames);
addArr(data.places.airports, 'Place');
addArr(data.places.cities, 'City');
addArr(data.places.countries, 'Country');
addArr(data.uncountables, 'Noun');
addArr(data.organizations, 'Organization');
addArr(data.groups, 'Noun');
addArr(data.adjectives, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
addArr(data.phrasal_verbs, 'PhrasalVerb');
addArr(data.verbs, 'Verb');
addArr(data.units, 'Unit');

//number-words are well-structured
let obj = data.numbers.ordinal;
addArr(Object.keys(obj.ones), 'Ordinal');
addArr(Object.keys(obj.teens), 'Ordinal');
addArr(Object.keys(obj.tens), 'Ordinal');
addArr(Object.keys(obj.multiples), 'Ordinal');
obj = data.numbers.cardinal;
addArr(Object.keys(obj.ones), 'Cardinal');
addArr(Object.keys(obj.teens), 'Cardinal');
addArr(Object.keys(obj.tens), 'Cardinal');
addArr(Object.keys(obj.multiples), 'Cardinal');
addArr(Object.keys(data.numbers.prefixes), 'Cardinal');
//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'Singular');
addArr(Object.keys(data.irregular_plurals.toSingle), 'Plural');

//dates are well-structured
addArr(data.dates.days, 'Day');
addArr(data.dates.months, 'Month');
addArr(data.dates.durations, 'Duration');
addArr(data.dates.relative, 'Date');
addArr(Object.keys(data.holidays), 'Day');

addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym'); //?

//irregular verbs
Object.keys(data.irregular_verbs).forEach((k) => {
  lexicon[k] = 'Infinitive';
  let conj = data.irregular_verbs[k];
  Object.keys(conj).forEach((k2) => {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
});

//conjugate verblist
const wantVerbs = [
  'PastTense',
  'PresentTense',
  // 'FutureTense',
  'Infinitive',
  'Gerund',
  'Actor',
  'Adjective'
];
data.verbs.forEach((v) => {
  let t = new Term(v);
  t.tag.Verb = true;
  let obj = t.info('conjugations');
  wantVerbs.forEach((k) => {
    if (obj[k] && !lexicon[obj[k]]) {
      lexicon[obj[k]] = k;
    // console.log(obj[k], k);
    }
  });
});

//conjugate adjectives
data.adjectives.forEach((v) => {
  let t = new Term(v);
  t.tag.Adjective = true;
  let obj = t.info('adjconjugations');
  Object.keys(obj).forEach((k) => {
    if (obj[k] && !lexicon[obj[k]]) {
      lexicon[obj[k]] = k;
    // console.log(obj[k], k);
    }
  });
});

//these ad-hoc manual ones have priority
addObj(data.misc);


//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon.singing);
// let t = new Term('sing');
// t.tag.Verb = true;
// console.log(t.info('conjugations'));
