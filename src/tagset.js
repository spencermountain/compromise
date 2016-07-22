'use strict';
//the POS tags we use, according to their dependencies
const tree = {
  Noun: {
    Singular: true,
    Plural: true,
    Actor: true,
    Demonym: true,
    Pronoun: true,
    Person: {
      MalePerson: true,
      FemalePerson: true,
      Place: {
        Country: true,
        City: true
      }
    },
    Organization: true,
    Value: {
      Currency: true,
      Ordinal: true,
      Cardinal: true
    },
    Date: true
  },
  Verb: {
    InfinitiveVerb: true,
    PastTense: true,
    GerundVerb: true,
    PresentTense: true,
    PerfectTense: true,
    PluperfectTense: true,
    FuturePerfect: true,
    Copula: true,
    Modal: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Determiner: true,
  Conjunction: true,
  Preposition: true,
  Condition: true,
  Possessive: true,
  QuestionWord: true,
  Expression: true
};

let tags = {};

const add_tags = (obj, parents) => {
  Object.keys(obj).forEach((k) => {
    tags[k] = parents;
    if (obj[k] !== true) {
      add_tags(obj[k], parents.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);
module.exports = tags;
console.log(tags);
