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
  ["resold", "resell"],
  ["blitzed", "blitz"],
  ["overpaid", "overpay"],
  ["toasted", "toast"],
  ["united", "unite"],
  ["forecasted", "forecast"],
  ["marketed", "market"],
  ["skyrocketed", "skyrocket"],
  ["ticketed", "ticket"],
  ["aroused", "arouse"],
  ["espoused", "espouse"],
  ["warehoused", "warehouse"],
  ["focused", "focus"],
  ["created", "create"],
  ["required", "require"],
  ["acquired", "acquire"],
  ["aired", "air"],
  ["persevered", "persevere"],
  ["imprisoned", "imprison"],
  ["poisoned", "poison"],
  ["seasoned", "season"],
  ["combed", "comb"],
  ["climbed", "climb"],
  ["succumbed", "succumb"],
  ["crowded", "crowd"],
  ["decreed", "decree"],
  ["longed", "long"],
  ["hacked", "hack"],
  ["clocked", "clock"],
  ["blocked", "block"],
  ["linked", "link"],
  ["marked", "mark"],
  ["tasked", "task"],
  ["totalled", "total"],
  ["intervened", "intervene"],
  ["reckoned", "reckon"],
  ["closed", "close"],
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
