module.exports = {
  Noun: {
    notA: ['Verb', 'Adjective', 'Adverb', 'Value'],
  },
  // - singular
  Singular: {
    isA: 'Noun',
    notA: 'Plural',
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun',
  },

  // -- people
  Person: {
    isA: ['ProperNoun', 'Singular'],
    notA: ['Place', 'Organization'],
  },
  FirstName: {
    isA: 'Person',
  },
  MaleName: {
    isA: 'FirstName',
    notA: ['FemaleName', 'LastName'],
  },
  FemaleName: {
    isA: 'FirstName',
    notA: ['MaleName', 'LastName'],
  },
  LastName: {
    isA: 'Person',
    notA: ['FirstName'],
  },
  Honorific: {
    isA: 'Noun',
  },

  // -- places
  Place: {
    isA: 'Singular',
    notA: ['Person', 'Organization'],
  },
  Country: {
    isA: ['Place', 'ProperNoun'],
    notA: ['City'],
  },
  City: {
    isA: ['Place', 'ProperNoun'],
    notA: ['Country'],
  },
  Region: {
    isA: ['Place', 'ProperNoun'],
  },
  Address: {
    isA: 'Place',
  },

  //---Orgs---
  Organization: {
    isA: ['Singular', 'ProperNoun'],
    notA: ['Person', 'Place'],
  },
  SportsTeam: {
    isA: 'Organization',
  },
  Company: {
    isA: 'Organization',
  },
  School: {
    isA: 'Organization',
  },

  // - plural
  Plural: {
    isA: 'Noun',
    notA: 'Singular',
  },
  Uncountable: {
    //(not plural or singular)
    isA: 'Noun',
  },
  Pronoun: {
    isA: 'Noun',
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
  },
  //'Canadians'
  Demonym: {
    isA: ['Noun', 'ProperNoun'],
  },
  //`john's`
  Possessive: {
    isA: 'Noun',
  },
}
