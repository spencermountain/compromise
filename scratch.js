/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')




// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

let doc = nlp(`poor fellow, who [should marry] Molly`).debug()
// let doc = nlp(`the critics have discovered`).debug()
// let doc = nlp(`legislatures have asked us`).debug()


/*




(#Noun && @hasHyphen) #Verb







*/
