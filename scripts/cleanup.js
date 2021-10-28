import switches from '../lib/switches/index.js'
import lexicon from '../lib/lexicon/index.js'

let all = {}
Object.keys(switches).forEach(k => {
  switches[k].words.forEach(word => {
    if (lexicon.hasOwnProperty(word)) {
      all[lexicon[word]] = all[lexicon[word]] || []
      all[lexicon[word]].push(word)
    }
  })
})
console.log(all) // eslint-disable-line
