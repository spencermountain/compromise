import fs from 'fs'
import path from 'path'
import { pack } from 'efrt'
import lexicon from '../../data/index.js'
// const nlpPlugin from 'compromise-plugin'

console.log('\n 🕑  - packing lexicon..')
const outFile = path.join(__dirname, '../../src/World/_data.js')

//turn them into a series of flat-arrays
let words = Object.keys(lexicon)
let packed = {}
words.forEach(word => {
  let tags = lexicon[word]
  if (typeof tags === 'string') {
    tags = [tags]
  }
  tags.forEach(tag => {
    packed[tag] = packed[tag] || []
    packed[tag].push(word)
  })
})

//pack each array into a tiny string
Object.keys(packed).forEach(tag => {
  packed[tag] = pack(packed[tag])
})

//write it to a file in ./src
fs.writeFileSync(outFile, 'module.exports=' + JSON.stringify(packed, null, 2), 'utf8')

//get filesize
const stats = fs.statSync(outFile)
let size = (stats['size'] / 1000.0).toFixed(1)

console.log('       - packed into  ' + size + 'k\n')
