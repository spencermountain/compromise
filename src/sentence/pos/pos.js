
const Term = require('../../term/term.js');

const Verb = require('../../term/verb/verb.js');
const Adverb = require('../../term/adverb/adverb.js');
const Adjective = require('../../term/adjective/adjective.js');

const Noun = require('../../term/noun/noun.js');
const Person = require('../../term/noun/person/person.js');
const Place = require('../../term/noun/place/place.js');
const Organisation = require('../../term/noun/organisation/organisation.js');
const Value = require('../../term/noun/value/value.js');
const _Date = require('../../term/noun/date/date.js');


const tag_mapping = {
  //nouns
  'NNA': 'Acronym',
  'NNS': 'Plural',
  'NN': 'Noun',
  'NNO': 'Posessive',
  'CD': 'Value',
  // 'NNP': 'Noun',
  // 'NNPA': 'Noun',
  // 'NNAB': 'Noun',
  // 'NNPS': 'Noun',
  // 'NNG': 'Noun',
  // 'CD': 'Noun',
  // 'NU': 'Noun',
  // 'DA': 'Noun',

  //glue
  'PP': 'Posessive',
  'PRP': 'Pronoun',
  'UH': 'Expression', //interjection
  'FW': 'Expression', //foreign-word
  'DT': 'Determiner',
  'CC': 'Conjunction',
  'IN': 'Preposition',

  //verbs
  'VB': 'Verb',
  'VBD': 'PastTense',
  'VBF': 'FutureTense',
  'VBP': 'Infinitive',
  'VBG': 'Gerund',
  'VBN': 'Verb',
  'VBZ': 'PresentTense',
  'CP': 'Copula',
  'MD': 'Modal',
  'JJ': 'Adjective',
  'JJR': 'Comparative',
  'JJS': 'Superlative',
  'RB': 'Adverb',
};

const classMapping = {
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

  'Comparative': Adjective,
  'Superlative': Adjective,
  'Adjective': Adjective,

  'Determiner': Term,
  'Preposition': Term,
  'Expression': Term,
  'Conjunction': Term,
  'Posessive': Term,

  'Adverb': Adverb,
  'Value': Value,
  'Place': Place,
  'Person': Person,
  'Date': _Date,
};

module.exports = {
  tag_mapping,
  classMapping,
  Term,
  'Date': _Date,
  Value,
  Verb,
  Person,
  Place,
  Organisation,
  Adjective,
  Adverb,
  Noun,
};
