/* eslint-disable no-console, no-unused-vars */
import nlp from './src/four.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')

let arr = [
  "Louis VI of France was known as this; as a child he must have shopped in le husky department",
  "Oh my god he sounded just like my high school wrestling  coach.",
  "New restaurant organizes their menu by feelings",
  "a state implemented voting to increase their total"
]
let doc = nlp(arr[0])//.debug()


// doc.nouns().debug()
console.log('from:')
let pron = doc.pronouns().debug()

console.log('to:')
pron.refersTo().debug()





