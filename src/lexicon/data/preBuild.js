const toPlural = require('../../result/subset/nouns/methods/pluralize');
// const fastConjugate = require("../result/subset/verbs/methods/conjugate/faster");
let supers = require('./computed/toSuperlative');
const alsoVerb = require('./computed/adjToVerb');
// const m = require('../../../result/subset/adjectives/methods');

//inflect singulars, conjugate infinitives
const buildOut = function(lex) {
  let keys = Object.keys(lex);
  for (let i = 0; i < keys.length; i++) {
    let str = keys[i];
    if (lex[str] === 'Singular') {
      //inflect singulars
      lex[toPlural(str)] = 'Plural';
      continue;
    }
    //conjugate infinitive verbs
    // if (lex[str] === 'Infinitive') {
    // const obj = fastConjugate(str);
    // let tags = Object.keys(obj);
    // for (var o = 0; o < tags.length; o++) {
    //   let tag = tags[o];
    //   lex[obj[tag]] = tag;
    // }
    // }
  }
  //add-in adjective-conjucations too
  let adjectives = supers.concat(alsoVerb);
  for (let i = 0; i < adjectives.length; i++) {
    lex[adjectives[i]] = 'Adjective';
    // let sup = m.toSuperlative(str);
    // let cmp = m.toComparative(str);
    // all[m.toNoun(str)] = 'Noun';
    // all[m.toAdverb(str)] = 'Adverb';
    //adjectives that become verbs with +'en' (short->shorten)
    // all[m.toVerb(str)] = 'Verb';
  }

  return lex;
};

module.exports = buildOut;
