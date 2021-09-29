import lexData from './_data.js'
import { unpack } from 'efrt'
import misc from './misc.js'
// unpack our lexicon of words
// (found in ./lib/lexicon/)

// more clever things are done on the data later
//  - once the plugin is applied

let lexicon = misc
Object.keys(lexData).forEach(tag => {
  let wordsObj = unpack(lexData[tag])
  Object.keys(wordsObj).forEach(w => (lexicon[w] = tag))
})

// misc cleanup
delete lexicon['']
delete lexicon[null]
delete lexicon[' ']

export default lexicon
