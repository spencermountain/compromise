//the POS tags we use, according to their dependencies
//(dont make it too deep, cause fns aren't properly clever-enough)
module.exports = {
  NounPhrase: {
    Noun: {
      Singular: {
        Pronoun: true,
        Person: {
          FirstName: {
            MaleName: true,
            FemaleName: true,
          },
          LastName: true,
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
      Date: {
        Month: true,
        WeekDay: true,
        RelativeDay: true,
        Year: true,
        Duration: true,
        Time: true,
        Holiday: true
      },
      Plural: true,
      Actor: true,
      Unit: true,
      Demonym: true,
      Possessive: true,
    },
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    FuturePerfect: true,
    Pluperfect: true,
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
  QuestionWord: true,
  Expression: true,
  Url: true,
  PhoneNumber: true,
  HashTag: true,
  Emoji: true,
  Email: true,

  //non-exclusive
  Condition: true,
  TitleCase: true,
  Auxillary: true,
  Negative: true,
  Contraction: true,
  Acronym: true,

  //phrases
  ValuePhrase: true,
  AdjectivePhrase: true,
  ConditionPhrase: true,

};
