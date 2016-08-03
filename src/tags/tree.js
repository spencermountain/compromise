
//the POS tags we use, according to their dependencies
module.exports = {
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
      Value: {
        Currency: true,
        Ordinal: true,
        Cardinal: true,
        TextValue: true,
        NumberValue: true
      },
      Date: true
    },
    Plural: true,
    Actor: true,
    Unit: true,
    Demonym: true
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
    Auxillary: true,
    PhrasalVerb: true,
    Negative: true
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
  Condition: true,
  Possessive: true,
  QuestionWord: true,
  Expression: true
};
