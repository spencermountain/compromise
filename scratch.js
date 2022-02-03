/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose('tagger')




// past-tense issues
// beat
// bet
// bias
// bid
// bike
// boss
// buzz
// core
// cost
// cut
// eye
// fit
// frame
// game
// gas
// gloss
// guess
// hit
// inhale
// manoeuvre
// mess
// name
// perfume
// pined
// pore
// programme
// prune
// redo
// rendezvous
// scout
// set
// shed
// ski
// smile
// spite
// spread
// sprinkle
// stall
// thrust
// time
// toll
// tone
// toss
// vibe
// zone

// to-gerund issues
// bang
// blitz
// boss
// cross
// fuzz
// gas
// gloss
// mess
// rendezvous
// smell
// yell

// to-present issues
// bias
// blitz
// boss
// buzz
// gloss
// kiss
// mess
// rendezvous
// ski
// toss
// witness
/*
*/
let txt = "non plentiful"
txt = "quiet relaunch"
txt = "president-elect"
txt = "another fool to roast"
txt = "There's holes everywhere"
txt = "another fool to roast"
txt = "favourite place in tampa"
txt = "and has soft music playing"
txt = "Good place to be"
txt = "provide weekly updates on the status"
txt = "Number of suspected al-Qa'ida members"
txt = " THE premier university"
txt = " THE favourite fruit"
txt = " New York style pizza"
txt = " 200,000 guns means 1000 tonnes"
txt = "only fight and win"
txt = "The two banks merged in 1985"
txt = "merged"
txt = "mentioned"
txt = "aired"
// txt = `Dr. Miller and his pal Joe`
let doc = nlp(txt)
// console.log(doc.verbs().conjugate())
doc.debug()
// console.log(doc.document[0][3].id)
// doc.ptrs = [[0, 3, 5, doc.document[0][3].id]]
// console.log(doc)
// console.log(doc.docs)
// let m = doc.match('#Person+')//.debug()
// console.log(m)
// m.debug()

// let doc = nlp('five hundred fifty nine is more than fifty')
// doc.values().toNumber()
// doc.debug()


// let doc = nlp(`yeah. one extra two match here three`)
// let m = doc.match('match here')
// doc.remove('extra')
// m.docs
// doc.match(m).debug()
// doc.debug()

// let doc = nlp('buy')
// console.log(doc.verbs().conjugate())



// let m = nlp('one two three. foo.')
// m = m.splitOn('two')
// m.match('three').remove()
// m.debug()

// let doc = nlp('once told me')
// let m = doc.match('once')
// doc.insertBefore('somebody')
// m.debug()
// 'once'


