module.exports = {
  Noun: {},
  // - singular
  Singular: {
    isA: 'Noun',
  },
  //a specific thing that's capitalized
  ProperNoun: {
    isA: 'Noun',
  },

  // -- people
  Person: {
    isA: 'ProperNoun',
    also: 'Singular',
  },
  FirstName: {
    isA: 'Person',
  },
  MaleName: {
    isA: 'FirstName',
  },
  FemaleName: {
    isA: 'FirstName',
  },
  LastName: {
    isA: 'Person',
  },
  Honorific: {
    isA: 'Noun',
  },
  Place: {
    isA: 'Singular',
  },

  // -- places
  Country: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  City: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Region: {
    isA: 'Place',
    also: 'ProperNoun',
  },
  Address: {
    isA: 'Place',
  },
  Organization: {
    isA: 'Singular',
    also: 'ProperNoun',
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
    isA: 'Noun',
    also: 'ProperNoun',
  },
  //`john's`
  Possessive: {
    isA: 'Noun',
  },
}
