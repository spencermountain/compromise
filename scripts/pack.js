/* eslint-disable no-console */
import fs from 'fs'
import { pack } from 'efrt'
import lexicon from '../lib/lexicon/index.js'
import switches from '../lib/switches/index.js'
import senses from '../lib/senses/index.js'

// compress our list of known-words
const packLex = function () {
  console.log('\n 🕑  - packing lexicon..')
  const outFile = './src/02-preTagger/model/lexicon/_data.js'
  let words = Object.keys(lexicon)
  let packed = {}
  //turn them into a series of flat-arrays
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
  let banner = `// generated in ./lib/lexicon/ \n`
  fs.writeFileSync(outFile, banner + 'export default ' + JSON.stringify(packed, null, 2), 'utf8')

  //get filesize
  const stats = fs.statSync(outFile)
  let size = (stats['size'] / 1000.0).toFixed(1)
  console.log('       - lexicon is  ' + size + 'k\n')
}

// ambiguous words to supplement lexicon in varied ways
const packSwitchers = function () {
  Object.keys(switches).forEach(k => {
    switches[k] = pack(switches[k])
  })

  //write it to a file in ./src
  let banner = `// generated in ./lib/switches/ \n`
  const outFile = './src/02-preTagger/model/switches/_data.js'
  fs.writeFileSync(outFile, banner + 'export default ' + JSON.stringify(switches, null, 2), 'utf8')

  //get filesize
  const stats = fs.statSync(outFile)
  let size = (stats['size'] / 1000.0).toFixed(1)
  console.log('       - switch-lexicon is  ' + size + 'k\n')
}

const packSenses = function () {
  Object.keys(senses).forEach(ambig => {
    senses[ambig].forEach(sense => {
      sense.words = pack(sense.words)
    })
  })
  //write it to a file in ./src
  let banner = `// generated in ./lib/switches/ \n`
  const outFile = './src/06-sense/model/_data.js'
  fs.writeFileSync(outFile, banner + 'export default ' + JSON.stringify(senses, null, 2), 'utf8')

  //get filesize
  const stats = fs.statSync(outFile)
  let size = (stats['size'] / 1000.0).toFixed(1)
  console.log('       - senses are  ' + size + 'k\n')
}

packLex()
packSwitchers()
packSenses()
