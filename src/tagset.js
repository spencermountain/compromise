'use strict';
//the POS tags we use, according to their dependencies


//list of inconsistent parts-of-speech
const incompatibles = [
  //top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression'],
  //nouns
  ['Person', 'Organization', 'Value', 'Date', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //things that can't be plural
  ['Plural', 'Singular'],
  ['Plural', 'Pronoun'],
  ['Plural', 'Person'],
  ['Plural', 'Organization'],
  ['Plural', 'Currency'],
  ['Plural', 'Ordinal'],
  //people
  ['MalePerson', 'FemalePerson'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Currency', 'Ordinal'], //$"5.50th"?
  //verbs
  ['Infinitive', 'Gerund', 'Pluperfect', 'FuturePerfect'],
  //tenses
  ['PastTense', 'PresentTense', 'PerfectTense'],
  //more verbs
  ['Copula', 'Modal']
];


const tree = {
  Noun: {
    Singular: true,
    Plural: true,
    Actor: true,
    Demonym: true,
    Pronoun: true,
    Person: {
      MalePerson: true,
      FemalePerson: true
    },
    Place: {
      Country: true,
      City: true
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
    Infinitive: true,
    PastTense: true,
    PresentTense: true,
    PerfectTense: true,
    Pluperfect: true,
    FuturePerfect: true,
    Gerund: true,
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
//recursively add them, with parents
const add_tags = (obj, parents) => {
  Object.keys(obj).forEach((k) => {
    tags[k] = parents;
    if (obj[k] !== true) {
      add_tags(obj[k], parents.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//for each tag, add their incompatibilities
Object.keys(tags).forEach((k) => {
  tags[k] = {
    parents: tags[k],
    not: {}
  };
  for (let i = 0; i < incompatibles.length; i++) {
    if (incompatibles[i].indexOf(k) !== -1) {
      incompatibles[i].forEach((s) => {
        if (s !== k) {
          tags[k].not[s] = true;
        }
      });
    }
  }
});
//also add their derived incompatible types
Object.keys(tags).forEach((k) => {
  for (let i = 0; i < tags[k].parents.length; i++) {
    let parent = tags[k].parents[i];
    let bad_keys = Object.keys(tags[parent].not);
    for (let o = 0; o < bad_keys.length; o++) {
      tags[k].not[bad_keys[o]] = parent;
    }
  }
});
module.exports = tags;
// console.log(tags);
