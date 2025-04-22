/* eslint-disable no-console, no-unused-vars */

import nlp from '../../src/three.js'
// import plugin from './src/plugin.js'
import plugin from './builds/compromise-payload.mjs'
nlp.extend(plugin)

const doc = nlp('i saw John Lennon, and john smith and bob dylan')

doc.match('(john|bob|dave) .').addPayload(m => {
  return { lastName: m.terms().last().text() }
})
console.log(doc.getPayloads())
