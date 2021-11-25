import month from './month.js'
import gerund from './verb/gerund.js'
import singular from './noun/singular.js'
import person from './noun/person.js'
import pastTense from './verb/pastTense.js'
import infinitive from './verb/infinitive.js'
import adjective from './adjective/adjective.js'

import adjectiveExtra from './adjective/adjective-extra.js'
import verbExtra from './verb/verb-extra.js'

const plural = Object.assign({}, singular)
const presentTense = Object.assign({}, infinitive)


export default {
  Month: month,
  Gerund: gerund,
  Singular: singular,
  Person: person,
  PastTense: pastTense,
  Infinitive: infinitive,
  PresentTense: presentTense,
  Plural: plural,
  Adjective: adjective,

  // AdjectiveExtra: adjectiveExtra,
  // VerbExtra: verbExtra
}


//  'Adjective|Gerund'
//  'Adjective|PastTense'
//  'Adjective|PresentTense'
//  'Adjective|Singular'

//  'Gerund|Singular'
//  'Singular|Person'
//  'Infinitive|Singular'

//  'Month|Person'
//  'Person|Infinitive'
