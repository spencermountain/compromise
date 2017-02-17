//the POS tags we use, according to their dependencies
//(dont make it too deep, cause fns aren't properly clever-enough)
module.exports = {
  Noun: {
    Singular: {
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
    Plural: true,
    Pronoun: true,
    Actor: true,
    Unit: true,
    Demonym: true,
    Possessive: true,
  },
  Date: { //not a noun, but usually is
    Month: true,
    WeekDay: true,
    RelativeDay: true,
    Year: true,
    Duration: true,
    Time: true,
    Holiday: true
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
    Participle: true,
    Particle: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Value: {
    Ordinal: true,
    Cardinal: {
      RomanNumeral: true,
    },
    Fraction: true,
    TextValue: true,
    NumericValue: true,
    NiceNumber: true,
    Money: true,
    NumberRange: true,
  },
  Currency: true,
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
  Auxillary: true,
  Negative: true,
  Contraction: true,

  TitleCase: true,
  CamelCase: true,
  UpperCase: true,
  Hyphenated: true,
  Acronym: true,
  ClauseEnd: true,
  //phrases
  Quotation: true,
  // ValuePhrase: true,
  // AdjectivePhrase: true,
  // ConditionPhrase: true,

};
