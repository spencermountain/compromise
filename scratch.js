/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')




// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())


let r = nlp('spencer is here. john was here.')
console.log(r.json())
// r.if('is')


/*




(#Noun && @hasHyphen) #Verb







*/
