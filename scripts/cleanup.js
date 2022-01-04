import switches from '../lib/lexicon/switches/index.js'
import lexicon from '../lib/lexicon/index.js'

let all = {}
let already = {}
Object.keys(switches).forEach(k => {
  switches[k].words.forEach(word => {
    if (lexicon.hasOwnProperty(word)) {
      all[lexicon[word]] = all[lexicon[word]] || []
      all[lexicon[word]].push(word)
    }
    if (already[word]) {
      console.log(word)
    }
    already[word] = true
  })
})
console.log(all) // eslint-disable-line
