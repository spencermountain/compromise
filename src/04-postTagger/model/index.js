import adj from './adjectives/index.js'
import advAdj from './adjectives/adverb-adj.js'
import gerundAdj from './adjectives/gerund-adj.js'

import adv from './adverbs/index.js'

import dates from './dates/index.js'

import noun from './nouns/index.js'
import adjNouns from './nouns/adj-noun.js'
import gerundNouns from './nouns/gerund-noun.js'
import infNouns from './nouns/inf-noun.js'
import presNouns from './nouns/pres-noun.js'

import money from './numbers/money.js'
import fractions from './numbers/fractions.js'
import numbers from './numbers/index.js'

import person from './person/index.js'
import personName from './person/ambig-name.js'

import verbs from './verbs/index.js'
import adjVerb from './verbs/adj-verb.js'
import auxiliary from './verbs/auxiliary.js'
import nounVerb from './verbs/noun-verb.js'
import phrasal from './verbs/phrasal.js'

import misc from './_misc.js'

import orgs from './organizations/index.js'
import places from './places.js'

let matches = [].concat(
  adj,
  advAdj,
  gerundAdj,
  adv,
  dates,
  noun,
  adjNouns,
  gerundNouns,
  infNouns,
  presNouns,
  money,
  fractions,
  numbers,
  person,
  personName,
  verbs,
  adjVerb,
  auxiliary,
  nounVerb,
  phrasal,
  misc,
  orgs,
  places
)
export default {
  two: {
    matches,
  },
}
