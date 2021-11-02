/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')


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


let txt = 'you smoked!'

// txt = `and Drew Fossum`
// txt = `the job interview.`
// txt = `use colour printing`
// txt = `my dear, and I am glad you can make`
// txt = `you will be rewarded for all you have suffered`
// txt = `it's a stuffed animal... you know`
// txt = `move quickly to complete`
// txt = `it was moving`
// txt = `Cashtech eyes A-Pac`
// txt = `the unfinished business of our country`
// txt = `to balance the budget.`
// txt=`Then she went to Grettel, shook her till she awoke, and cried: Get up, you lazy - bones, fetch water and cook something for your brother.`
// txt=`For the ultimate in geek chic, get the TI - 89 Titanium graphing calculator from this company, TXN`
// txt=`At this discourse of the crier the Prince of the Indies, considering that the principal motive of his travel was to carry the Sultan, his father, home some singular rarity, thought that he could not meet with any which could give him more satisfaction.`


// let doc = nlp(txt).debug()

// txt = `out-lived`
// txt = `he limited`
txt = `he smoked`
let doc = nlp(txt).debug()
doc.verbs().toFutureTense()
doc.debug()



/*




(#Noun && @hasHyphen) #Verb







*/
