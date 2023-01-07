/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

// let doc = nlp("the boys and the cows studied")//.debug()
let doc = nlp("He weighs fifty kilos and his skin is the color of squash.").debug()
// let doc = nlp("the boys and girls studied their numbers")//.debug()


doc.nouns().debug()
// console.log('from:')
// let pron = doc.pronouns().debug()

// console.log('to:')
// pron.refersTo().debug()





