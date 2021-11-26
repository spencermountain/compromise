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
txt = `repurchase the milk`

// txt = `yoga and horses`
// txt = `to probe and alter`
// txt = `the city and surrounding area`
// txt = `the Senate's composition and powers`
// txt = `small twigs & stems`
// txt = `the winds and storms`
// txt = `collection of odds and ends`

// txt = `10 markets and pop-ups`
txt = `gangs and kids cutting class`
txt = `two banks merged`
txt = `the company quite brilliantly, said Mr. Newhouse`
txt = `craze is sweeping the country`
txt = `You really got me thinking, I enjoy`
txt = `SNAP is right in part`
txt = `It is trying to play ice hockey`
txt = `Islamic Jihad known as the Vanguards`
txt = `and new business models for transmission `
txt = `we expect to have separate contracts`


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
