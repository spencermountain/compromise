import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)

let doc = nlp('i saw John Lennon, and john smith and bob dylan')
doc.match('(john|bob|dave) .').addPayload(m => {
  return m.text().match(/john/i) ? { isjohn: true } : null
})

// console.log(doc.getPayloads())
// doc.match('john .').clearPayloads()
console.log(doc.match('john .').getPayloads())

// doc.match('(john|bob|dave) .').addPayload(m => {
//   return { lastName: m.terms().last().text() }
// })
