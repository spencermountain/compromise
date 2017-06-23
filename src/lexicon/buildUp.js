const adj = require('../text/subset/adjectives/methods');
const toPlural = require('../text/subset/nouns/methods/pluralize');
const fastConjugate = require('../text/subset/verbs/methods/conjugate/faster');

//inflect 'Singulars', conjugate 'Infinitives', and convert 'Comparables'
const buildUp = function(lex, options) {
  //handle default options
  options = options || {};
  if (options.conjugate !== false) {
    options.conjugate = true;
  }
  if (options.inflect !== false) {
    options.inflect = true;
  }
  //loop through each word in lexicon(!)
  let keys = Object.keys(lex);
  for (let i = 0; i < keys.length; i++) {
    let str = keys[i];
    //conjugate infinitives
    if (options.conjugate === true && lex[str] === 'Infinitive') {
      const obj = fastConjugate(str);
      let tags = Object.keys(obj);
      for (var o = 0; o < tags.length; o++) {
        let tag = tags[o];
        lex[obj[tag]] = tag;
      }
      continue;
    }
    //inflect singular nouns
    if (options.inflect === true && lex[str] === 'Singular') {
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

module.exports = buildUp;
