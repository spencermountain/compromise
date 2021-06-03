const entity = ['Person', 'Place', 'Organization']

module.exports = {
  Noun: {
    not: ['Verb', 'Adjective', 'Adverb'],
  },
  // - singular
  Singular: {
    parents: 'Noun',
    not: 'Plural',
  },
  //a specific thing that's capitalized
  ProperNoun: {
    parents: 'Noun',
  },

  // -- people
  Person: {
    parents: ['ProperNoun', 'Singular'],
    not: ['Place', 'Organization', 'Date'],
  },
  FirstName: {
    parents: 'Person',
  },
  MaleName: {
    parents: 'FirstName',
    not: ['FemaleName', 'LastName'],
  },
  FemaleName: {
    parents: 'FirstName',
    not: ['MaleName', 'LastName'],
  },
  LastName: {
    parents: 'Person',
    not: ['FirstName'],
  },
  NickName: {
    parents: 'Person',
    not: ['FirstName', 'LastName'],
  },
  Honorific: {
    parents: 'Noun',
    not: ['FirstName', 'LastName', 'Value'],
  },

  // -- places
  Place: {
    parents: 'Singular',
    not: ['Person', 'Organization'],
  },
  Country: {
    parents: ['Place', 'ProperNoun'],
    not: ['City'],
  },
  City: {
    parents: ['Place', 'ProperNoun'],
    not: ['Country'],
  },
  Region: {
    parents: ['Place', 'ProperNoun'],
  },
  Address: {
    parents: 'Place',
  },

  //---Orgs---
  Organization: {
    parents: ['Singular', 'ProperNoun'],
    not: ['Person', 'Place'],
  },
  SportsTeam: {
    parents: 'Organization',
  },
  School: {
    parents: 'Organization',
  },
  Company: {
    parents: 'Organization',
  },

  // - plural
  Plural: {
    parents: 'Noun',
    not: ['Singular'],
  },
  //(not plural or singular)
  Uncountable: {
    parents: 'Noun',
  },
  Pronoun: {
    parents: 'Noun',
    not: entity,
  },
  //a word for someone doing something -'plumber'
  Actor: {
    parents: 'Noun',
    not: entity,
  },
  //a gerund-as-noun - 'swimming'
  Activity: {
    parents: 'Noun',
    not: ['Person', 'Place'],
  },
  //'kilograms'
  Unit: {
    parents: 'Noun',
    not: entity,
  },
  //'Canadians'
  Demonym: {
    parents: ['Noun', 'ProperNoun'],
    not: entity,
  },
  //`john's`
  Possessive: {
    parents: 'Noun',
    // not: 'Pronoun',
  },
}
