/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// States that make basic private health insurance [should receive] federal funds
// let doc = nlp(`Purchase of power from IPPs will ruin GEB`)
// let doc = nlp(`On Wednesday guerrillas had kidnapped a cosmetic surgeon and his wife while they were on their way home.`)
let doc = nlp(`You wonder if he was manipulating the market with his bombing targets.`)
doc.chunks().debug('chunks')

//
/*












*/
