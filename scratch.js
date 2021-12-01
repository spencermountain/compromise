/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s.text())


let txt
// txt = `please go `

// let arr = [
//   // `Toronto`,
//   `delta`,
//   `farming`,
//   `Toronto`,
//   `Toronto marlies`,
// ]
// console.log(nlp.compile(arr))

// bug: doc-match issue
// txt = `clearly did suggest`
// let doc = nlp(txt)
// let vb = doc.verbs()
// let parsed = vb.parse()[0]
// parsed.auxiliary.debug()
// vb.match(parsed.auxiliary).debug()


// prepend-shift
let doc = nlp('no self')
let m = doc.match('self')
m.prepend('before hand')
m.debug()

// bug 1
// txt = `he out-lived`
// txt = `he out lived`
// txt = `pseudo clean`
// txt = `he was anti cleaning`
// // txt = `he was anti cleaning`
// txt = 'study'
// let doc = nlp(txt).tag('Verb')
// doc.verbs().debug()
// console.log(doc.verbs().conjugate())
// let vb = doc.update([[0, 1, 3]])

// let will = doc.update([[0, 1, 2]])
// let walk = doc.update([[0, 2, 3]])//.debug()

// vb.replace(will, 'fooWill')
// vb.replace(walk, 'foowalk')
// doc.verbs().toPastTense()
// doc.debug()


// AND issue:
// let doc = nlp('toronto and montreal. Sydney and Paris.')
// console.log(nlp.parseMatch('(#Place && #Noun)')[0].choices)
// let m = doc.match('(#Place && #Noun)').debug()

/*










*/
