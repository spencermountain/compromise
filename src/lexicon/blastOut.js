const fastConjugate = require('../text/subset/verbs/methods/conjugate/faster');
const toPlural = require('../text/subset/nouns/methods/pluralize');
const adj = require('../text/subset/adjectives/methods');

//inflect 'Singulars', conjugate 'Infinitives', and convert 'Comparables'
const blastOut = function(lex) {
  let keys = Object.keys(lex);
  for (let i = 0; i < keys.length; i++) {
    let str = keys[i];
    //conjugate infinitives
    if (lex[str] === 'Infinitive') {
      const obj = fastConjugate(str);
      let tags = Object.keys(obj);
      for (var o = 0; o < tags.length; o++) {
        let tag = tags[o];
        lex[obj[tag]] = tag;
      }
      continue;
    }
    //inflect singular nouns
    if (lex[str] === 'Singular') {
      let plural = toPlural(str);
      lex[plural] = 'Plural';
      continue;
    }
    //conjugate comparable adjectives
    if (lex[str] === 'Comparable') {
      lex[adj.toComparative(str)] = 'Comparative';
      lex[adj.toSuperlative(str)] = 'Superlative';
      lex[adj.toNoun(str)] = 'Noun';
      lex[adj.toAdverb(str)] = 'Adverb';
      // lex[adj.toVerb(str)] = 'Verb';
      continue;
    }
  }
  //..just in case
  delete lex[null];
  delete lex[undefined];
  return lex;
};

module.exports = blastOut;
