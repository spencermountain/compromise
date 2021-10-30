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


// let txt = `and Drew Fossum`

// let txt = `the job interview.`
// let txt = `use colour printing`
// let txt = `my dear, and I am glad you can make`
// let txt = `you will be rewarded for all you have suffered`
// let txt = `it's a stuffed animal... you know`
// let txt = `move quickly to complete`
// let txt = `it was moving`
// let txt = `Cashtech eyes A-Pac`
// let txt = `the unfinished business of our country`
// let txt = `to balance the budget.`
// let txt=`Then she went to Grettel, shook her till she awoke, and cried: Get up, you lazy - bones, fetch water and cook something for your brother.`
// let txt=`For the ultimate in geek chic, get the TI - 89 Titanium graphing calculator from this company, TXN`
// let txt=`At this discourse of the crier the Prince of the Indies, considering that the principal motive of his travel was to carry the Sultan, his father, home some singular rarity, thought that he could not meet with any which could give him more satisfaction.`


let txt = `temptation is a desire to engage and build`
let doc = nlp(txt)
let m = doc.match('build')
m.notIf('lkajsdf').debug()
// doc.sentences().toPastTense().debug()
// doc.debug()

console.log(doc.text())




/*




(#Noun && @hasHyphen) #Verb







*/
