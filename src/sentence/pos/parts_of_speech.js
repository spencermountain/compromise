
const Term = require('../../term/term.js');

const Verb = require('../../term/verb/verb.js');
const Adverb = require('../../term/adverb/adverb.js');
const Adjective = require('../../term/adjective/adjective.js');

const Noun = require('../../term/noun/noun.js');
const Person = require('../../term/noun/person/person.js');
const Place = require('../../term/noun/place/place.js');
const Organization = require('../../term/noun/organization/organization.js');
const Value = require('../../term/noun/value/value.js');
const _Date = require('../../term/noun/date/date.js');
const Url = require('../../term/noun/url/url.js');

const tag_mapping = {
  //nouns
  'NNA': 'Acronym',
  'NNS': 'Plural',
  'NN': 'Noun',
  'NNO': 'Possessive',
  'CD': 'Value',
  // 'NNP': 'Noun',
  // 'NNPA': 'Noun',
  // 'NNAB': 'Noun',
  // 'NNPS': 'Noun',
  // 'NNG': 'Noun',
  'AC': 'Actor',
  'DA': 'Date',
  'CO': 'Condition',
  'PN': 'Person',

  //glue
  'PP': 'Possessive',
  'PRP': 'Pronoun',
  'EX': 'Expression', //interjection
  'DT': 'Determiner',
  'CC': 'Conjunction',
  'IN': 'Preposition',

  //verbs
  'VB': 'Verb',
  'VBD': 'PastTense',
  'VBF': 'FutureTense',
  'VBP': 'Infinitive',
  'VBZ': 'PresentTense',
  'VBG': 'Gerund',
  'VBN': 'Verb',
  'CP': 'Copula',
  'MD': 'Modal',
  'JJ': 'Adjective',
  'JJR': 'Comparative',
  'JJS': 'Superlative',
  'RB': 'Adverb',

  'QU': 'Question',
};

const classMapping = {
  'Noun': Noun,
  'Honourific': Noun,
  'Acronym': Noun,
  'Plural': Noun,
  'Pronoun': Noun,
  'Actor': Noun,
  'Abbreviation': Noun,
  'Currency': Noun,

  'Verb': Verb,
  'PresentTense': Verb,
  'FutureTense': Verb,
  'PastTense': Verb,
  'Infinitive': Verb,
  'PerfectTense': Verb,
  'PluperfectTense': Verb,
  'Gerund': Verb,
  'Copula': Verb,
  'Modal': Verb,

  'Comparative': Adjective,
  'Superlative': Adjective,
  'Adjective': Adjective,
  'Demonym': Adjective,

  'Determiner': Term,
  'Preposition': Term,
  'Expression': Term,
  'Conjunction': Term,
  'Possessive': Term,
  'Question': Term,
  'Symbol': Term,

  'Email': Noun,
  'AtMention': Noun,
  'HashTag': Noun,
  'Url': Url,

  //not yet fully-supported as a POS
  'MalePerson': Person,
  'FemalePerson': Person,

  'Adverb': Adverb,
  'Value': Value,

  'Place': Place,
  'City': Place,
  'Country': Place,

  'Person': Person,
  'Organization': Organization,
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
  Organization,
  Adjective,
  Adverb,
  Noun,
};
