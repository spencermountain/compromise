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
text = `must-see show`
text = `smelled like smoke`
text = `would look like`
text = `seek progress`
text = `zero in`
text = `it was time`
text = `I've read`
text = `provide record levels`
text = `cut costs`
text = `charity said`
text = `victoria learned`
text = `april learned`
text = `bob in the water`
// text = 'litigation costs'
// text = 'US battles to save storm victims'
// text = 'the letters concern'
// text = 'our drinks'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
// text = 'cool.com/fun'
// text = 'he is cool/nice'
// text = `It's a father`
// text = 'extremely heated tube'
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
