const entity = ['Person', 'Place', 'Organization']

export default {
  Noun: {
    not: ['Verb', 'Adjective', 'Adverb'],
  },
  Singular: {
    parents: 'Noun',
    not: 'Plural',
  },
  ProperNoun: {
    parents: 'Noun',
  },
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
  Plural: {
    parents: 'Noun',
    not: ['Singular'],
  },
  Uncountable: {
    parents: 'Noun',
  },
  Pronoun: {
    parents: 'Noun',
    not: entity,
  },
  Actor: {
    parents: 'Noun',
    not: entity,
  },
  Activity: {
    parents: 'Noun',
    not: ['Person', 'Place'],
  },
  Unit: {
    parents: 'Noun',
    not: entity,
  },
  Demonym: {
    parents: ['Noun', 'ProperNoun'],
    not: entity,
  },
  Possessive: {
    parents: 'Noun',
    not: ['Adjective', 'Verb'],
  },
}
