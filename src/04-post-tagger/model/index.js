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

import numbers from './numbers/_misc.js'

import person from './person/_misc.js'
import personName from './person/ambig-name.js'

import verbs from './verbs/_misc.js'

import misc from './_misc.js'

import orgs from './organizations.js'
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
  numbers,
  person,
  personName,
  verbs,
  misc,
  orgs,
  places
)
export default {
  matches,
}
