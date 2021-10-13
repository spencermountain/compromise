/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let txt = 'because you are a client i can not ask'
let txt = 'Had to lick his shoe'
// let txt = 'My first play through of it'
// let txt = 'after I am done soaking it'
// let txt = 'you have only the practice of friendship'
// let txt = 'Though it may sound cliche, you really have nothing to lose'
// let txt = 'we commended him for his bravery'
// let txt = 'I wanted breakfast in bed'
// let txt = 'memories still remind me'
// let txt = 'everybody in the tavern'
// let txt = 'with the black suit i wore'
// let txt = 'give them the best'
// let txt = 'the service techs are friendly'
// let txt = 'the noise the slide makes'
// let txt = 'precisely to relieve the burden'
// let txt = 'desi upsets the videshi'
// let txt = 'desi is upset'

// let txt = 'should give parents the power'
// let txt = 'Sweet is the scent'
let doc = nlp(txt)

doc.compute('chunks').debug('chunks')
doc.nouns().debug()

//
/*












*/
