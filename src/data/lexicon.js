'use strict';
//a lexicon is a giant object of known words and their assumed pos-tag.
//the way we make it rn is a bit of a mess.
const data = require('./index');
const fns = require('./fns');
const adj = require('../result/subset/adjectives/methods');
const toAdjective = require('../result/subset/verbs/methods/toAdjective');
const fastConjugate = require('../result/subset/verbs/methods/conjugate/faster');
let lexicon = {};
// console.time('lexicon');

const addObj = (o) => {
  fns.extendObj(lexicon, o);
};
const addArr = (arr, tag) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//let a rip
const units = data.units.words.filter((s) => s.length > 1);
addArr(units, 'Unit');
addArr(data.dates.durations, 'Duration');

addObj(data.abbreviations);
//number-words are well-structured
let obj = data.numbers.ordinal;
let tags = ['Ordinal', 'TextValue'];
addArr(Object.keys(obj.ones), tags);
addArr(Object.keys(obj.teens), tags);
addArr(Object.keys(obj.tens), tags);
addArr(Object.keys(obj.multiples), tags);

let tags2 = ['Cardinal', 'TextValue'];
obj = data.numbers.cardinal;
addArr(Object.keys(obj.ones), tags2);
addArr(Object.keys(obj.teens), tags2);
addArr(Object.keys(obj.tens), tags2);
addArr(Object.keys(obj.multiples), tags2);
addArr(Object.keys(data.numbers.prefixes), tags2);
//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'Singular');
addArr(Object.keys(data.irregular_plurals.toSingle), 'Plural');

//dates are well-structured
addArr(data.dates.days, 'WeekDay');
addArr(data.dates.months, 'Month');
addArr(data.dates.relative, 'RelativeDay');

//irregular verbs
Object.keys(data.irregular_verbs).forEach((inf) => {
  lexicon[inf] = 'Infinitive';
  const conj = data.irregular_verbs[inf];
  Object.keys(conj).forEach((k2) => {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
  const o = fastConjugate(inf);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//conjugate verblist
data.verbs.forEach((v) => {
  const o = fastConjugate(v);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
  lexicon[toAdjective(v)] = 'Adjective';
});

//conjugate adjectives
data.superlatives.forEach((a) => {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';
});

//even more expressive adjectives
data.verbConverts.forEach((a) => {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';

  const v = adj.toVerb(a);
  lexicon[v] = 'Verb';
  //now conjugate it
  const o = fastConjugate(v);
  Object.keys(o).forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});


//let a rip.
// addObj(data.firstnames);
addArr(data.notable_people.female, 'FemaleName');
addArr(data.notable_people.male, 'MaleName');
addArr(data.titles, 'Singular');
addArr(data.verbConverts, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
//these ad-hoc manual ones have priority
addObj(data.misc);

//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon['ugh']);
