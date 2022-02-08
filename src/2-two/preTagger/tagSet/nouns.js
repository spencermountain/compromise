const entity = ['Person', 'Place', 'Organization']

export default {
  Noun: {
    not: ['Verb', 'Adjective', 'Adverb', 'Value', 'Determiner'],
  },
  Singular: {
    is: 'Noun',
    not: ['Plural'],
  },
  ProperNoun: {
    is: 'Noun',
  },
  Person: {
    is: 'Singular',
    also: ['ProperNoun'],
    not: ['Place', 'Organization', 'Date'],
  },
  FirstName: {
    is: 'Person',
  },
  MaleName: {
    is: 'FirstName',
    not: ['FemaleName', 'LastName'],
  },
  FemaleName: {
    is: 'FirstName',
    not: ['MaleName', 'LastName'],
  },
  LastName: {
    is: 'Person',
    not: ['FirstName'],
  },
  Honorific: {
    is: 'Noun',
    not: ['FirstName', 'LastName', 'Value'],
  },
  Place: {
    is: 'Singular',
    not: ['Person', 'Organization'],
  },
  Country: {
    is: 'Place',
    also: ['ProperNoun'],
    not: ['City'],
  },
  City: {
    is: 'Place',
    also: ['ProperNoun'],
    not: ['Country'],
  },
  Region: {
    is: 'Place',
    also: ['ProperNoun'],
  },
  Address: {
    // is: 'Place',
  },
  Organization: {
    is: 'ProperNoun',
    not: ['Person', 'Place'],
  },
  SportsTeam: {
    is: 'Organization',
  },
  School: {
    is: 'Organization',
  },
  Company: {
    is: 'Organization',
  },
  Plural: {
    is: 'Noun',
    not: ['Singular'],
  },
  Uncountable: {
    is: 'Noun',
  },
  Pronoun: {
    is: 'Noun',
    not: entity,
  },
  Actor: {
    is: 'Noun',
    not: entity,
  },
  Activity: {
    is: 'Noun',
    not: ['Person', 'Place'],
  },
  Unit: {
    is: 'Noun',
    not: entity,
  },
  Demonym: {
    is: 'Noun',
    also: ['ProperNoun'],
    not: entity,
  },
  Possessive: {
    is: 'Noun',
  },
}
