/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

let txt = `Kensington Market art project [takes] catcallers to task`
// let txt = `conditions of employment started`
// let txt = `it's when Bob [can dance] with Sue again'`
// let txt = `And one of the first steps we [can take] together`
// let txt = `it's when Bob [can dance] with Sue again`
// let txt = `the skill you [can sell] is your knowledge`

let doc = nlp(txt).debug()
// console.log(doc.text('normal'))
// console.log(doc.text())

// console.log(doc.verbs().json()[0])
//
/*












*/
