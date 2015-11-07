'use strict';
const pos = require('./pos');
let Noun = pos.Noun;
let Verb = pos.Verb;

const mapping = {
  'Noun': Noun,
  'Honourific': Noun,
  'Acronym': Noun,
  'Plural': Noun,
  'Pronoun': Noun,
  'Name': Noun,

  'Verb': Verb,
  'PresentTense': Verb,
  'PastTense': Verb,
  'Infinitive': Verb,
  'Gerund': Verb,
  'Abbreviation': Verb,
  'Copula': Verb,
  'Modal': Verb,

  'Comparative': pos.Adjective,
  'Superlative': pos.Adjective,
  'Adjective': pos.Adjective,

  'Determiner': pos.Term,
  'Preposition': pos.Term,
  'Expression': pos.Term,
  'Conjunction': pos.Term,
  'Posessive': pos.Term,

  'Adverb': pos.Adverb,
  'Value': pos.Value,
  'Place': pos.Place,
  'Person': pos.Person,
  'Date': pos._Date,
};

//swap the Term object with a proper Pos class
const assign = function(t, tag, reason) {
  if (!mapping[tag]) {
    console.log(t.text + '   ' + tag);
  }
  let P = mapping[tag] || Term;
  t = new P(t.text, tag);
  t.reason = reason;
  return t;
};

module.exports = assign;
