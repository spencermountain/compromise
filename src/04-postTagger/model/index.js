import adj from './adjectives/_misc.js'
import advAdj from './adjectives/adverb-adj.js'
import gerundAdj from './adjectives/gerund-adj.js'

import adv from './adverbs/_misc.js'

import dates from './dates/_misc.js'

import noun from './nouns/_misc.js'
import adjNouns from './nouns/adj-noun.js'
import gerundNouns from './nouns/gerund-noun.js'
import infNouns from './nouns/inf-noun.js'
import presNouns from './nouns/pres-noun.js'

import money from './numbers/money.js'
import fractions from './numbers/fractions.js'
import numbers from './numbers/_misc.js'

import person from './person/_misc.js'
import personName from './person/ambig-name.js'

import verbs from './verbs/_misc.js'
import adjVerb from './verbs/adj-verb.js'
import auxiliary from './verbs/auxiliary.js'
import nounVerb from './verbs/noun-verb.js'
import phrasal from './verbs/phrasal.js'

import misc from './_misc.js'

import orgs from './organizations/_misc.js'
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
