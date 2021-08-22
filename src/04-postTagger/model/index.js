import adj from './ambig/adjective/adjective.js'
import advAdj from './ambig/adjective/adj-adverb.js'
import gerundAdj from './ambig/adjective/adj-gerund.js'
import nounAdj from './ambig/adjective/adj-noun.js'
import adjVerb from './ambig/adjective/adj-verb.js'

import adv from './ambig/adverb.js'

import dates from './phrase/date-phrase.js'
import ambigDates from './ambig/date.js'

import noun from './ambig/nouns.js'
import gerundNouns from './ambig/verb-noun/gerund-noun.js'
import presNouns from './ambig/verb-noun/verb-noun.js'

import money from './ambig/numbers/money.js'
import fractions from './ambig/numbers/fractions.js'
import numbers from './ambig/numbers/numbers.js'

import person from './phrase/person-phrase.js'
import personName from './ambig/name.js'

import verbs from './phrase/verb-phrase/index.js'
import auxiliary from './phrase/verb-phrase/auxiliary.js'
import phrasal from './phrase/verb-phrase/phrasal.js'

import misc from './_misc.js'

import orgs from './phrase/orgs/index.js'
import places from './phrase/places.js'
import conjunctions from './ambig/conjunctions.js'

let matches = [].concat(
  adj,
  advAdj,
  gerundAdj,
  nounAdj,
  adv,
  ambigDates,
  dates,
  noun,
  gerundNouns,
  presNouns,
  money,
  fractions,
  numbers,
  person,
  personName,
  verbs,
  adjVerb,
  auxiliary,
  phrasal,
  misc,
  orgs,
  places,
  conjunctions
)
export default {
  two: {
    matches,
  },
}
