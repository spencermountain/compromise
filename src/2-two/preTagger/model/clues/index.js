import adjective from './adjective.js'
import month from './month.js'
import gerund from './verb/gerund.js'
import singular from './noun/singular.js'
import person from './noun/person.js'
import pastTense from './verb/pastTense.js'
import infinitive from './verb/infinitive.js'

const plural = Object.assign({}, singular)
const presentTense = Object.assign({}, infinitive)

export default {
  Adjective: adjective,
  Month: month,
  Gerund: gerund,
  Singular: singular,
  Person: person,
  PastTense: pastTense,
  Infinitive: infinitive,
  PresentTense: presentTense,
  Plural: plural
}