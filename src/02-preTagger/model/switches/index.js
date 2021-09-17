import data from './_data.js'
import { unpack } from 'efrt'
// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)

// Object.keys(data).forEach(k => {
//   data[k].words = unpack(data[k].words)
// })

export default data
