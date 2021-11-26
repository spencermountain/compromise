/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

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
txt = `the Princess thought`
txt = `the skeleten show`
txt = `major record labels`
txt = `a nice present`
txt = `i saw a minor`
txt = `attempt`
txt = `the ruling party`
txt = `shiver`
txt = `shiver all night`
txt = `Bharti initiates talks`

// let doc = nlp(txt)
// doc.debug()


txt = `our house looks great`
txt = `the vision appears and starts to walk and sing`
txt = `the vision will appear and will start to walk and sing`
let doc = nlp(txt)
// doc.sentences().toPast()
// doc.sentences().toFuture()
doc.sentences().toPresent()
doc.debug()
// console.log(doc.out('text'))


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
