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
      for (let o = 0; o < tags.length; o++) {
        let tag = tags[o];
        if (lex[obj[tag]] === undefined) {
          lex[obj[tag]] = tag;
        }
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
      let w = adj.toComparative(str);
      if (lex[w] === undefined) {
        lex[w] = 'Comparative';
      }
      w = adj.toSuperlative(str);
      if (lex[w] === undefined) {
        lex[w] = 'Superlative';
      }
      w = adj.toNoun(str);
      if (lex[w] === undefined) {
        lex[w] = 'Noun';
      }
      w = adj.toAdverb(str);
      if (lex[w] === undefined) {
        lex[w] = 'Adverb';
      }
      // lex[adj.toVerb(str)] = 'Verb';
      continue;
    }
    //conjugate phrasal verbs too
    // if (lex[str] === 'PhrasalVerb') {
    //   let parts = str.split(/ /);
    //   const obj = fastConjugate(parts[0]);
    //   let tags = Object.keys(obj);
    //   for (let o = 0; o < tags.length; o++) {
    //     let tag = tags[o];
    //     lex[obj[tag] + ' ' + parts[1]] = 'PhrasalVerb';
    //   }
    //   continue;
    // }
  }
  lex['is'] = ['Copula', 'PresentTense'];
  lex['was'] = ['Copula', 'PastTense'];
  lex['will be'] = ['Copula', 'FutureTense'];
  lex['close'] = 'Adjective';
  lex['can'] = 'Modal';
  // lex['move'] = 'N';
  //..just in case
  delete lex[null];
  delete lex[undefined];
  return lex;
};

module.exports = buildUp;
