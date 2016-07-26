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
  Expression: true,
  Term: true //fallback
};

//list of inconsistent parts-of-speech
const conflicts = [
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
  //non-infinitive
  ['Infinitive', 'PastTense'],
  ['Infinitive', 'PresentTense'],
  //non-gerund
  ['Gerund', 'PastTense'],
  ['Gerund', 'PresentTense'],
  //more verbs
  ['Copula', 'Modal']
];
let tags = {};
//recursively add them, with is
const add_tags = (obj, is) => {
  Object.keys(obj).forEach((k) => {
    tags[k] = is;
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//for each tag, add their notibilities
Object.keys(tags).forEach((k) => {
  tags[k] = {
    is: [].concat(tags[k]),
    not: {}
  };
  for (let i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(k) !== -1) {
      conflicts[i].forEach((s) => {
        if (s !== k) {
          tags[k].not[s] = true;
        }
      });
    }
  }
});
//also add their derived notible types
Object.keys(tags).forEach((k) => {
  for (let i = 0; i < tags[k].is.length; i++) {
    let parent = tags[k].is[i];
    let bad_keys = Object.keys(tags[parent].not);
    for (let o = 0; o < bad_keys.length; o++) {
      tags[k].not[bad_keys[o]] = true;
    }
  }
});
//add themselves to 'is'
Object.keys(tags).forEach((k) => {
  // tags[k].is = tags[k].is.concat([k]);
  tags[k].is.push(k);
});

module.exports = tags;
// console.log(tags);
