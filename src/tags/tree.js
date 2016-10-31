
//the POS tags we use, according to their dependencies
module.exports = {
  NounPhrase: {
    Noun: {
      Singular: {
        Pronoun: true,
        Person: {
          MalePerson: true,
          FemalePerson: true,
          Honorific: true
        },
        Place: {
          Country: true,
          City: true,
          Address: true
        },
        Organization: {
          SportsTeam: true,
          Company: true,
          School: true,
        },
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
        Time: true,
        Holiday: true
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
  Value: {
    Currency: true,
    Ordinal: true,
    Fraction: true,
    Cardinal: true,
    TextValue: true,
    NumericValue: true,
    NumberRange: true
  },
  //glue
  Determiner: true,
  Conjunction: true,
  Preposition: true,

  Condition: true,
  TitleCase: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  PhoneNumber: true,
  HashTag: true,
  Email: true,
  Auxillary: true,
  Negative: true,

  ValuePhrase: true,
  AdjectivePhrase: true,
};
