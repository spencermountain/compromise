const entity = ['Person', 'Place', 'Organization']

module.exports = {
  Noun: {
    notA: ['Verb', 'Adjective', 'Adverb'],
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
    notA: ['Place', 'Organization', 'Date'],
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
  NickName: {
    isA: 'Person',
    notA: ['FirstName', 'LastName'],
  },
  Honorific: {
    isA: 'Noun',
    notA: ['FirstName', 'LastName', 'Value'],
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
  School: {
    isA: 'Organization',
  },
  Company: {
    isA: 'Organization',
  },

  // - plural
  Plural: {
    isA: 'Noun',
    notA: ['Singular'],
  },
  //(not plural or singular)
  Uncountable: {
    isA: 'Noun',
  },
  Pronoun: {
    isA: 'Noun',
    notA: entity,
  },
  //a word for someone doing something -'plumber'
  Actor: {
    isA: 'Noun',
    notA: entity,
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    isA: 'Noun',
    notA: ['Person', 'Place'],
  },
  //'kilograms'
  Unit: {
    isA: 'Noun',
    notA: entity,
  },
  //'Canadians'
  Demonym: {
    isA: ['Noun', 'ProperNoun'],
    notA: entity,
  },
  //`john's`
  Possessive: {
    isA: 'Noun',
    // notA: 'Pronoun',
  },
}
