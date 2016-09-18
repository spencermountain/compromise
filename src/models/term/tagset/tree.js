
//the POS tags we use, according to their dependencies
module.exports = {
  NounPhrase: {
    Noun: {
      Singular: {
        Pronoun: true,
        Person: {
          MalePerson: true,
          FemalePerson: true,
          Honourific: true
        },
        Place: {
          Country: true,
          City: true
        },
        Organization: true,
      },
      Plural: true,
      Actor: true,
      Unit: true,
      Demonym: true,
      Possessive: true,
      Date: {
        Month: true,
        Day: true,
        Year: true,
        Duration: true,
        Time: true
      },
    },
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    Pluperfect: true,
    FuturePerfect: true,
    Copula: true,
    Modal: true,
    Participle: true
  },
  VerbPhrase: {
    Particle: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Glue: {
    Determiner: true,
    Conjunction: true,
    Preposition: true
  },
  Value: {
    Currency: true,
    Ordinal: true,
    Cardinal: true,
    TextNumber: true,
    Numeric: true
  },
  Condition: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  HashTag: true,
  Email: true,
  Auxillary: true,
  Negative: true,

  ValuePhrase: true,
  AdjectivePhrase: true,
};
