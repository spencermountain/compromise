/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

// let doc = nlp("New restaurant organizes their menu by feelings")//.debug()
let doc = nlp("spencer's aunt is fun. she is smart")//.debug()
// let doc = nlp("a state implemented voting to increase their total")//.debug()


// doc.nouns().debug()
console.log('from:')
let pron = doc.pronouns().debug()

console.log('to:')
pron.refersTo().debug()





