/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'

// nlp.verbose('tagger')

// import './tests/one/match/named-silent.test.js'
// import './tests/one/match/encoding.test.js'
// import './tests/one/match/if.test.js'
// import './tests/one/match/regex.test.js'
// import './tests/one/match/doc-match.test.js'
// import './tests/one/match/negative.test.js'

let doc = nlp('in 3/8ths of a second').debug()
doc.fractions().toFraction().debug()
// let m = doc.match('one !two three')

// doc = nlp.tokenize('one two three')
// m = doc.match('one !foo three')

// doc = nlp.tokenize('one two three')
// m = doc.match('one !foo? two three')
// t.equal(m.text(), 'one two three', here + 'skip-not')

// doc = nlp.tokenize(`one after`)
// m = doc.match(`one !foo? moo? after`)

// m = doc.match(`one !foo? after`)

// doc = nlp(`I have not booked`)

// // -make sure we do not find 'not'
// m = doc.match(`have !not? booked`)

// // make sure we do not find 'not'
// // but with tricky next-term greedy
// m = doc.match(`have !not? * booked`)

/*

1. verb parse
2. verb conjugate
3. noun parse
  3a. person parse0
  3a. place parse


*/

// let doc = nlp('the people in toronto drove quickly').debug()
// let doc = nlp(`he professes love`).debug()
// let doc = nlp(` and living in Toronto`).debug()
// let doc = nlp(` Amazing Experience! `).debug()

// let text = 'litigation costs'
// let text = 'US battles to save storm victims'
// text = 'the letters concern'
// text = 'our drinks'
// text = 'diet traps'
// text = 'tape measures'
// text = '#cool'
// text = 'cool.com/fun'
// text = 'he is cool/nice'
// text = `It's a father`
// text = 'extremely heated tube'
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
