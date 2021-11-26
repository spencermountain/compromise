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

const copy = (obj) => {
  return Object.keys(obj).reduce((h, k) => {
    h[k] = obj[k] === 'Infinitive' ? 'PresentTense' : 'Plural'
    return h
  }, {})
}

// make a copy of this one
clues['Plural|Verb'] = {
  beforeWords: copy(clues['Noun|Verb'].beforeWords),
  afterWords: copy(clues['Noun|Verb'].afterWords),
  beforeTags: copy(clues['Noun|Verb'].beforeTags),
  afterTags: copy(clues['Noun|Verb'].afterTags),
}
// add some custom plural clues
Object.assign(clues['Plural|Verb'].beforeTags, {
  Conjunction: 'PresentTense', //and changes
  // Noun: undefined
})
Object.assign(clues['Plural|Verb'].afterTags, {
  Noun: 'PresentTense', //changes gears
  Value: 'PresentTense' //changes seven gears
})
export default clues