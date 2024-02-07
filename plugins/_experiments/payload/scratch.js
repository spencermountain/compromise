import nlp from '../../../src/three.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)

let doc = nlp('i saw John Lennon play the guitar')
doc.people().forEach(m => {
  if (m.has('lennon')) {
    m.addPayload({ height: `5'11`, instrument: 'guitar' })
  }
})
console.log(doc.getPayloads())
