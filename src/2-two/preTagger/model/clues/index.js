import { Inf, Pres, Plur, ActorVerb, AdjGerund, AdjNoun, AdjPast, AdjPresent, NounVerb, NounGerund, PersonNoun, PersonVerb, PersonAdj, PluralVerb } from '../../tagSet/_lib.js'
import actorVerb from './actor-verb.js'
import adjGerund from './adj-gerund.js'
import adjNoun from './adj-noun.js'
import adjPast from './adj-past.js'
import adjPresent from './adj-present.js'
import nounGerund from './noun-gerund.js'
import nounVerb from './noun-verb.js'
import personDate from './person-date.js'
import personNoun from './person-noun.js'
import personVerb from './person-verb.js'
import personPlace from './person-place.js'
import personAdj from './person-adj.js'
import unitNoun from './unit-noun.js'

const clues = {
  [ActorVerb]: actorVerb,
  [AdjGerund]: adjGerund,
  [AdjNoun]: adjNoun,
  [AdjPast]: adjPast,
  [AdjPresent]: adjPresent,
  [NounVerb]: nounVerb,
  [NounGerund]: nounGerund,
  [PersonNoun]: personNoun,
  'Person|Date': personDate,
  [PersonVerb]: personVerb,
  'Person|Place': personPlace,
  [PersonAdj]: personAdj,
  'Unit|Noun': unitNoun,
}

const copy = (obj, more) => {
  const res = Object.keys(obj).reduce((h, k) => {
    h[k] = obj[k] === Inf ? Pres : Plur
    return h
  }, {})
  return Object.assign(res, more)
}

// make a copy of this one
clues[PluralVerb] = {
  beforeWords: copy(clues[NounVerb].beforeWords, {
    had: Plur, //had tears
    have: Plur,
  }),
  afterWords: copy(clues[NounVerb].afterWords, {
    his: Pres,
    her: Pres,
    its: Pres,
    in: null,
    to: null,
    is: Pres, //the way it works is
    by: Pres, //it works by
  }),
  beforeTags: copy(clues[NounVerb].beforeTags, {
    Conjunction: Pres, //and changes
    Noun: undefined, //the century demands
    ProperNoun: Pres, //john plays
  }),
  afterTags: copy(clues[NounVerb].afterTags, {
    Gerund: Plur, //ice caps disappearing
    Noun: Pres, //changes gears
    Value: Pres, //changes seven gears
  }),
}
// add some custom plural clues
export default clues
