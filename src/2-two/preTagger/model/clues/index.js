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
  'Person|Place': personPlace,
}

const copy = (obj, more) => {
  let res = Object.keys(obj).reduce((h, k) => {
    h[k] = obj[k] === 'Infinitive' ? 'PresentTense' : 'Plural'
    return h
  }, {})
  return Object.assign(res, more)
}

// make a copy of this one
clues['Plural|Verb'] = {
  beforeWords: copy(clues['Noun|Verb'].beforeWords, {

  }),
  afterWords: copy(clues['Noun|Verb'].afterWords, {
    his: 'PresentTense', her: 'PresentTense', its: 'PresentTense',
    in: null, to: null,
  }),
  beforeTags: copy(clues['Noun|Verb'].beforeTags, {
    Conjunction: 'PresentTense', //and changes
    Noun: undefined, //the century demands
    ProperNoun: 'PresentTense'//john plays
  }),
  afterTags: copy(clues['Noun|Verb'].afterTags, {
    Gerund: 'Plural',//ice caps disappearing
    Noun: 'PresentTense', //changes gears
    Value: 'PresentTense' //changes seven gears
  }),
}
// add some custom plural clues
export default clues