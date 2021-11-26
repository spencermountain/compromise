/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. match.`)
// let m = doc.match('match').freeze()
// doc.remove('extra')
// doc.match(m).debug()

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s)
// console.log(s.text())


let txt
txt = `#cool @cool`
txt = `Fundo ltd.`
txt = `repurchase the milk`
txt = `imagines shocking`
txt = `the shocking cost of health`
txt = `the former president of the United States of America`
txt = `1575 Leonardo beats Ruy Lopez`
txt = `yoga and horses`
txt = `to probe and alter`
txt = `the city and surrounding area`
txt = `the Senate's composition and powers`
txt = `small twigs & stems`
// txt = `kiss of death`
// txt = `I only feed them dry food.`
// txt = `my pre and post reading opinion`
// txt = `10 markets and pop-ups`
txt = `the winds and storms`
txt = `flash could`
txt = `The new century demands new partnerships for peace and security.`
txt = `bullet artist [shows] his arsenal`
txt = `The U of R is also recommended, too`
txt = `flash is`
// txt = `each negative thought`
// txt = `collection of odds and ends`

let doc = nlp(txt)
doc.debug()


// txt = `the vision appears and starts to walk and sing`
// let doc = nlp(txt)
// doc.sentences().toPast()
// doc.sentences().toFuture()
// doc.sentences().toPresent()
// doc.debug()


// let arr = [
//   ["recreated", "recreate"],
//   ["postponed", "postpone"],
//   ["pondered", "ponder"],
//   ["boned", "bone"],
// ]
// let doc = nlp(arr[arr.length - 1][0]).debug()
// doc.verbs().toInfinitive()
// console.log(doc.text())


// bug 1
// txt = `he out-lived`
// txt = `he out lived`
// txt = `pseudo clean`
// txt = `he was anti cleaning`
// // txt = `he was anti cleaning`
// let doc = nlp(txt)
// console.log(doc.verbs().json()[0])
// doc.verbs().toFutureTense()
// doc.debug()



/*










*/
