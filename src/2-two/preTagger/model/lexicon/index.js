import lexData from '../../../_built/lexicon.js'
import { unpack } from 'efrt'
import misc from './misc.js'
import frozenLex, { shared } from './frozenLex.js'
import emoticons from './emoticons.js'
import toPlural from '../../methods/transform/nouns/toPlural/index.js'
import irregularPlurals from '../irregulars/plurals.js'
import { Conj, Country, Acronym, Emoticon, NounVerb, PluralVerb } from '../../tagSet/_lib.js'
// unpack our lexicon of words
// (found in ./lexicon/)

// more clever things are done on the data later
//  - once the plugin is applied
const hasSwitch = /\|/
const countryAcronyms = ['uk', 'usa', 'ussr']
const lexicon = { ...misc, ...shared }
const switches = {}

const tmpModel = { two: { irregularPlurals, uncountable: {} } }

Object.keys(lexData).forEach(tag => {
  // the packer strips the shared 'true¦' prefix
  const wordsObj = unpack('true¦' + lexData[tag])
  // POS tag, or something fancier?
  if (!hasSwitch.test(tag)) {
    // set them as simple word key-value lookup
    Object.keys(wordsObj).forEach(w => {
      lexicon[w] = tag
    })
    return
  }
  // add them as seperate key-val object
  Object.keys(wordsObj).forEach(w => {
    switches[w] = tag
    // pluralize Noun|Verb switches
    if (tag === NounVerb) {
      const plural = toPlural(w, tmpModel)
      // Invariant irregular plurals intentionally share a switch.
      if (plural !== w || irregularPlurals[w] === w) {
        switches[plural] = PluralVerb
      }
    }
  })
})
// Keep the conditional tag alongside the packed conjunction entry.
lexicon.if = [Conj, 'Condition']

// Keep country initialisms out of the generic acronym retagging pass.
countryAcronyms.forEach(word => {
  lexicon[word] = [Country, Acronym]
})

// add ':)'
emoticons.forEach(str => (lexicon[str] = Emoticon))

// misc cleanup
delete lexicon['']
delete lexicon[null]
delete lexicon[' ']

export { lexicon, switches, frozenLex }
