import {
  Person, Place, Organization, V, JJ, RB, Value, Det, NN, NNS, Uncountable, NNs, NNP, Date,
  FirstName, FemaleName, LastName, MaleName, City, Country, PRP,
} from './_lib.js'

const entity = [Person, Place, Organization]

export default {
  Noun: {
    not: [V, JJ, RB, Value, Det],
  },
  Singular: {
    is: NN,
    not: [NNS, Uncountable],
  },
  // 'Canada'
  ProperNoun: {
    is: NN,
    alias: 'Prop'
  },
  Person: {
    is: NNs,
    also: [NNP],
    not: [Place, Organization, Date],
  },
  FirstName: {
    is: Person,
  },
  MaleName: {
    is: FirstName,
    not: [FemaleName, LastName],
  },
  FemaleName: {
    is: FirstName,
    not: [MaleName, LastName],
  },
  LastName: {
    is: Person,
    not: [FirstName],
  },
  // 'dr.'
  Honorific: {
    is: Person,
    not: [FirstName, LastName, Value],
    alias: 'Hon'
  },
  Place: {
    is: NNs,
    not: [Person, Organization],
  },
  Country: {
    is: Place,
    also: [NNP],
    not: [City],
  },
  City: {
    is: Place,
    also: [NNP],
    not: [Country],
  },
  // 'california'
  Region: {
    is: Place,
    also: [NNP],
  },
  Address: {
    // is: 'Place',
    alias: 'Addr'
  },
  Organization: {
    is: NNP,
    not: [Person, Place],
    alias: 'Org'
  },
  SportsTeam: {
    is: Organization,
  },
  School: {
    is: Organization,
  },
  Company: {
    is: Organization,
  },
  Plural: {
    is: NN,
    not: [NNs, Uncountable],
  },
  // 'gravity'
  Uncountable: {
    is: NN,
  },
  // 'it'
  Pronoun: {
    is: NN,
    not: entity,
  },
  // 'swimmer'
  Actor: {
    is: NN,
    not: [Place, Organization],
  },
  // walking
  Activity: {
    is: NN,
    not: [Person, Place],
  },
  // kilometres
  Unit: {
    is: NN,
    not: entity,
  },
  // canadian
  Demonym: {
    is: NN,
    also: [NNP],
    not: entity,
  },
  // [spencer's] hat
  Possessive: {
    is: NN,
    alias: 'Poss'
  },
  // 'yourself'
  Reflexive: {
    is: PRP,
  },
}
