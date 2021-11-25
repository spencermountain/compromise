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
// txt = `wait I see`
// txt = ``

// let doc = nlp(txt)
// doc.debug()


let arr = [
  // ["forecasted", "forecast"],
  ["tasted", "forecast"],
  ["overseen", "oversee"],
  ["misunderstood", "misunderstand"],
  ["unwound", "unwind"],
  ["blasted", "blast"],
  ["ignited", "ignite"],
  ["permeated", "permeate"],
  ["recreated", "recreate"],
  ["praised", "praise"],
  ["explored", "explore"],
  ["layered", "layer"],
  ["answered", "answer"],
  ["lowered", "lower"],
  ["severed", "sever"],
  ["covered", "cover"],
  ["leaked", "leak"],
  ["misled", "mislead"],
  ["buttered", "butter"],
  ["uttered", "utter"],
  ["cleaned", "clean"],
  ["rained", "rain"],
  ["joined", "join"],
  ["ruined", "ruin"],
  ["postponed", "postpone"],
  ["pondered", "ponder"],
  ["triggered", "trigger"],
  ["checkered", "checker"],
  ["slaughtered", "slaughter"],
  ["chartered", "charter"],
  ["sequestered", "sequester"],
  ["bolstered", "bolster"],
  ["mustered", "muster"],
]
let doc = nlp(arr[arr.length - 1][0]).debug()
doc.verbs().toInfinitive()
console.log(doc.text())


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
