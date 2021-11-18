import lexData from './_data.js'
import { unpack } from 'efrt'
import misc from './misc.js'
import methods from '../../methods/index.js'
// unpack our lexicon of words
// (found in ./lib/lexicon/)

// more clever things are done on the data later
//  - once the plugin is applied
const hasSwitch = /\|/
let lexicon = misc
let variables = {}

Object.keys(lexData).forEach(tag => {
  let wordsObj = unpack(lexData[tag])
  // POS tag, or something fancier?
  if (!hasSwitch.test(tag)) {
    // set them as simple word key-value lookup
    Object.keys(wordsObj).forEach(w => {
      lexicon[w] = tag
    })
  } else {
    // add them as seperate key-val object
    Object.keys(wordsObj).forEach(w => {
      variables[w] = tag
      // pluralize Infinitive|Singular
      if (tag === 'Infinitive|Singular') {
        variables[w + 's'] = 'PresentTense|Plural'
      }
    })
  }
})
// misc cleanup
delete lexicon['']
delete lexicon[null]
delete lexicon[' ']
export { lexicon, variables }
