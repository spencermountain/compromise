/* eslint-disable no-console, no-unused-vars */

import nlp from '../../src/three.js'
// import plugin from './src/plugin.js'
import plugin from './builds/compromise-payload.mjs'
nlp.extend(plugin)

// three sentences
let doc = nlp('One is red. Two is blue. Three is green.')
// add payload to each color
doc.match('(red|blue|green)').forEach(m => m.addPayload({ color: m.text() }))

doc.getPayloads().forEach(p => {
  console.log(p.match.text(), p.val.color)
})
// red red
// blue blue
// green green

// remove the sentence
doc.remove('two is blue')

doc.getPayloads().forEach(p => {
  console.log(p.match.text(), p.val.color)
})
// red red
// green green
