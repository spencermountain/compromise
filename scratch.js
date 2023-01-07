/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let doc = nlp("nobody tell Josh's mom that she burned her toast.")//.debug()

doc.nouns().debug()
// console.log('from:')
// let pron = doc.pronouns().debug()

// console.log('to:')
// pron.refersTo().debug()





