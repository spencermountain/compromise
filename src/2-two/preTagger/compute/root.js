import eachTerm from '../../../1-one/tokenize/compute/_lib.js'
import { Past, Ger, Inf, Pres } from '../tagSet/_lib.js'

const toInf = (str, world, tense) => world.methods.two.transform.verb.toInfinitive(str, world.model, tense)

// first matching tag wins. (str, world, term) -> root form
const toRoot = {
  // 'spencer's' -> 'spencer'
  Possessive: str => str.replace(/'s$/, ''),
  // 'drinks' -> 'drink'
  Plural: (str, world) => world.methods.two.transform.noun.toSingular(str, world.model),
  Copula: () => 'is',
  // 'walked' -> 'walk'
  PastTense: (str, world) => toInf(str, world, Past),
  // 'walking' -> 'walk'
  Gerund: (str, world) => toInf(str, world, Ger),
  // 'walks' -> 'walk'
  PresentTense: (str, world, term) => term.tags.has(Inf) ? str : toInf(str, world, Pres),
  // 'quieter' -> 'quiet'
  Comparative: (str, world) => world.methods.two.transform.adjective.fromComparative(str, world.model),
  // 'quietest' -> 'quiet'
  Superlative: (str, world) => world.methods.two.transform.adjective.fromSuperlative(str, world.model),
  // 'suddenly' -> 'sudden'
  Adverb: (str, world) => world.methods.two.transform.adjective.fromAdverb(str),
}

const getRoot = function (view) {
  const world = view.world
  const keys = Object.keys(toRoot)
  eachTerm(view.docs, term => {
    const key = keys.find(k => term.tags.has(k))
    if (key) {
      const str = term.machine || term.normal || term.text
      const root = toRoot[key](str, world, term)
      if (term.normal !== root) {
        term.root = root
      }
    }
  })
}
export default getRoot
