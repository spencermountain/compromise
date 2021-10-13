/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let txt = `says sorry there is no gravy`
// let txt = 'because you are a client i can not ask'
// let txt = 'everybody in the tavern'
// let txt = 'with the black suit i wore'
// let txt = 'give them the best'
// let txt = 'the service techs are friendly'
// let txt = 'the noise the slide makes'
// let txt = 'precisely to relieve the burden'
// let txt = 'desi upsets the videshi'
// let txt = 'Did the Founders'
// let txt = 'should give parents the power'
let txt = 'Sweet is the scent'
let doc = nlp(txt)

doc.compute('chunks').debug('chunks')
doc.nouns().debug()

//
/*












*/
