/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

let txt = ''

// let doc = nlp(txt)
// doc.debug()

// const doc = nlp('he is cool')
// doc.verbs().toNegative()
// doc.debug()

nlp.addTags({
  Doctor: {
    isA: 'Person',
  },
  Surgeon: {
    isA: 'Doctor',
  },
})
let doc = nlp('george is a person.')
doc.match('george').tag('Surgeon')
doc.debug()




/*










*/
