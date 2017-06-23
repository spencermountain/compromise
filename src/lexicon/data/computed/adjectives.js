//adjective-conjugation methods
// const m = require('../../../result/subset/adjectives/methods');
//adjectives that conjugate to superlative/adverb forms
let basic = require('./toSuperlative');

//adjectives that become verbs with +'en' (short->shorten)
//(they also become superlative/comparative (short -> shortest))
const alsoVerb = require('./adjToVerb');

let all = {};
basic = basic.concat(alsoVerb);
for (let i = 0; i < basic.length; i++) {
  let str = basic[i];
  all[str] = 'Adjective';
  //superlative
  // let sup = m.toSuperlative(str);
  // if (sup.match('^most ') === null) {
  //   all[sup] = 'Superlative';
  // }
  // //comparative
  // let cmp = m.toComparative(str);
  // if (cmp.match('^more ') === null) {
  //   all[cmp] = 'Comparative';
  // }
  // all[m.toNoun(str)] = 'Noun';
  // all[m.toAdverb(str)] = 'Adverb';
}
// console.log(all.quick);

// for (let i = 0; i < alsoVerb.length; i++) {
//   let str = alsoVerb[i];
//   all[m.toVerb(str)] = 'Verb';
// }

module.exports = all;
