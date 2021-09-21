/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'

nlp.verbose('tagger')

// import './tests/one/match/named-silent.test.js'
// import './tests/one/match/encoding.test.js'
// import './tests/one/match/itap /Users/spencer/mountain/compromise/tests/two/match.test.jsf.test.js'
// import './tests/one/match/regex.test.js'
// import './tests/one/match/doc-match.test.js'
// import './tests/one/match/negative.test.js'

let text = 'dept of state'
text = `john k. johnson`
text = `That's hearty, said the Giant;`
// text = 'litigation costs'
// text = 'US battles to save storm victims'
// text = 'the letters concern'
// text = 'our drinks'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
const doc = nlp(text).debug()

// let doc = nlp(text).debug()
// console.log(doc.document)
// doc.nouns().debug()
// doc.compute('chunks').debug('chunks')
// doc.verbs().subjects().debug()
// doc.verbs().debug()
// console.log(doc.verbs().conjugate())
// doc.verbs().forEach(vb => {
//   vb = vb.verbs()
//   console.log(vb.text())
//   vb.subjects().debug()
// })
// doc.verbs().toInfinitive()

/*




*/
