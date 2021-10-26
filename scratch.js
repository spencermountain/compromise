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


let txt = `we drink whole [bottles]`
//let txt= `your incision [site].`
//let txt= `Gun [talk]`
//let txt= `during the planning [process] `
//let txt= `Mehtab was older in [age]`
//let txt= `this is straight up [stalking].`
//let txt= `With the rhymes and the [ties] and the dolla signs`
//let txt= `before his [play] "The Cherry Orchard"`
//let txt= `anarchist theory and poststructuralist [thought]`
//let txt= `Surat saree brands faded by [fakes]`
//let txt= `the cottage was made of bread and roofed with [cakes]`
//let txt= `The liver receives a dual blood [supply] from the arteries.`

let doc = nlp(txt).debug()
// doc.verbs().toInfinitive()
// console.log(doc.text())
// doc.verbs().toFutureTense()




/*




(#Noun && @hasHyphen) #Verb







*/
