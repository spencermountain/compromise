import adj from './adjectives/ambig.js'
import advAdj from './adverbs/adverb-adj.js'
import gerundAdj from './adjective-verb/gerund-adj.js'

import adv from './adverbs/ambig.js'

import dates from './dates/date-phrase.js'
import ambigDates from './dates/ambig.js'

import noun from './nouns/index.js'
import adjNouns from './adjective-noun/adj-noun.js'
import gerundNouns from './verb-noun/gerund-noun.js'
import infNouns from './verb-noun/inf-noun.js'
import presNouns from './verb-noun/pres-noun.js'

import money from './numbers/money.js'
import fractions from './numbers/fractions.js'
import numbers from './numbers/numbers.js'

import person from './person/person-phrase.js'
import personName from './person/ambig-name.js'

import verbs from './verbs/index.js'
import adjVerb from './adjective-verb/adj-verb.js'
import auxiliary from './verbs/auxiliary.js'
import nounVerb from './verb-noun/noun-verb.js'
import phrasal from './verbs/phrasal.js'

import misc from './_misc.js'

import orgs from './organization/index.js'
import places from './places.js'

let matches = [].concat(
  adj,
  advAdj,
  gerundAdj,
  adv,
  ambigDates,
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
