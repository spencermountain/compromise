/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

nlp.verbose('tagger')




// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s)
// console.log(s.text())


// let txt = `your incision [site].`
// let txt= `Gun [talk]`

// let txt = `before his [play] "The Cherry Orchard"`
// let txt = `the work stresses hit me`
let txt = `the software patches were`
// let txt= `this is straight up [stalking].`
// let txt = `faded by [fakes]`
// let txt = `a dual blood [supply] from the arteries.`



let doc = nlp(txt).debug()
// doc.verbs().toInfinitive()
// console.log(doc.text())
// doc.verbs().toFutureTense()




/*




(#Noun && @hasHyphen) #Verb







*/
