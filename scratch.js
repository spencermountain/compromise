/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')




// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let doc = nlp(`Pursuing a successful career, along with the usual social and financial advantages, will be easier this year `)
let doc = nlp(`he will be walked`).debug()
// doc.nouns().debug()
// console.log(doc.verbs().toInfinitive().text())


/*




(#Noun && @hasHyphen) #Verb







*/
