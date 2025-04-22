/* eslint-disable no-console */
import fs from 'fs'
import { pack } from 'efrt'
import { compress, learn } from 'suffix-thumb'
// import { compress, learn } from '/Users/spencer/mountain/suffix-thumb/src/index.js'

import lexicon from '../data/lexicon/index.js'
import models from '../data/pairs/index.js'

const steps = [
  {
    label: 'lexicon',
    path: './src/2-two/preTagger/model/lexicon/_data.js',
    compress: function () {
      const packed = {}
      //turn them into a series of flat-arrays
      Object.keys(lexicon).forEach(word => {
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
      return packed
    },
  },
  {
    label: 'pairs',
    path: './src/2-two/preTagger/model/models/_data.js',
    compress: function () {
      const begin = new Date()
      Object.keys(models).forEach(k => {
        console.log('     - ' + k)
        const opts = {}
        if (k === 'AdjToNoun') {
          opts.reverse = false
        }
        const model = learn(models[k], opts)
        models[k] = compress(model)
      })
      const end = new Date()
      console.log((end.getTime() - begin.getTime()) / 1000)
      return models
    },
  },
  // {
  //   label: 'senses',
  //   path: './src/4-four/sense/model/_data.js',
  //   compress: function () {
  //     Object.keys(senses).forEach(ambig => {
  //       senses[ambig].forEach(sense => {
  //         sense.words = pack(sense.words)
  //       })
  //     })
  //     return senses
  //   },
  // },
]

// run through all our steps
steps.forEach(obj => {
  console.log(`\n 🕑  - packing ${obj.label}..`)
  const packed = obj.compress()

  //write it to a file in ./src
  const banner = `// generated in ./lib/${obj.label}\n`
  fs.writeFileSync(obj.path, banner + 'export default ' + JSON.stringify(packed, null, 2), 'utf8')

  //get filesize
  const stats = fs.statSync(obj.path)
  const size = (stats.size / 1000.0).toFixed(1)
  console.log(`       - ${obj.label} is  ` + size + 'k\n')
})
