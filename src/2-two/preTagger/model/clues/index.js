import adjGerund from './adj-gerund.js'
import adjNoun from './adj-noun.js'
import adjPast from './adj-past.js'
import adjPresent from './adj-present.js'
import nounGerund from './noun-gerund.js'
import nounVerb from './noun-verb.js'
import personDate from './person-date.js'
import personNoun from './person-noun.js'
import personVerb from './person-verb.js'

const clues = {
  'Adj|Gerund': adjGerund,
  'Adj|Noun': adjNoun,
  'Adj|Past': adjPast,
  'Adj|Present': adjPresent,
  'Noun|Verb': nounVerb,
  'Noun|Gerund': nounGerund,
  'Person|Noun': personNoun,
  'Person|Date': personDate,
  'Person|Verb': personVerb,
}

// make a few copies

export default clues