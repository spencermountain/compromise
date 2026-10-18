import {
  Pers,
  Place,
  Org,
  Vb,
  Adj,
  Adv,
  Val,
  Det,
  NN,
  Plur,
  Uncountable,
  Sing,
  Prop,
  Date,
  First,
  FemaleName,
  Last,
  MaleName,
  City,
  Country,
  Pron,
} from './_lib.js'

const entity = [Pers, Place, Org]

export default {
  Noun: {
    aliases: [null, 'NN'],
    not: [Vb, Adj, Adv, Val, Det],
  },
  Singular: {
    aliases: [null, 'Sing', 'SG', 'NN1'],
    is: NN,
    not: [Plur, Uncountable],
  },
  // 'Canada'
  ProperNoun: {
    aliases: ['Prop', 'NNP', 'PROPN', 'NP0'],
    is: NN,
  },
  Person: {
    aliases: [null, 'Pers'],
    is: Sing,
    also: [Prop],
    not: [Place, Org, Date],
  },
  FirstName: {
    aliases: [null, 'First'],
    is: Pers,
  },
  MaleName: {
    is: First,
    not: [FemaleName, Last],
  },
  FemaleName: {
    is: First,
    not: [MaleName, Last],
  },
  LastName: {
    aliases: [null, 'Last'],
    is: Pers,
    not: [First],
  },
  // 'dr.'
  Honorific: {
    aliases: ['Hon'],
    is: Pers,
    not: [First, Last, Val],
  },
  Place: {
    is: Sing,
    not: [Pers, Org],
  },
  Country: {
    is: Place,
    also: [Prop],
    not: [City],
  },
  City: {
    is: Place,
    also: [Prop],
    not: [Country],
  },
  // 'california'
  Region: {
    is: Place,
    also: [Prop],
  },
  Address: {
    aliases: ['Addr'],
    // is: 'Place',
  },
  Organization: {
    aliases: ['Org'],
    is: Prop,
    not: [Pers, Place],
  },
  SportsTeam: {
    aliases: [null, 'Team'],
    is: Org,
  },
  School: {
    is: Org,
  },
  Company: {
    is: Org,
  },
  Plural: {
    aliases: [null, 'Plur', 'NNS', 'PL', 'NN2'],
    is: NN,
    not: [Sing, Uncountable],
  },
  // 'gravity'
  Uncountable: {
    is: NN,
  },
  // 'it'
  Pronoun: {
    aliases: [null, 'Pron', 'PRP', 'PRON'],
    is: NN,
    not: entity,
  },
  // 'swimmer'
  Actor: {
    is: NN,
    not: [Place, Org],
  },
  // walking
  Activity: {
    is: NN,
    not: [Pers, Place],
  },
  // kilometres
  Unit: {
    is: NN,
    not: entity,
  },
  // canadian
  Demonym: {
    aliases: [null, 'Dem'],
    is: NN,
    also: [Prop],
    not: entity,
  },
  // [spencer's] hat
  Possessive: {
    aliases: ['Poss'],
    is: NN,
  },
  // 'yourself'
  Reflexive: {
    aliases: [null, 'Refl'],
    is: Pron,
  },
}
