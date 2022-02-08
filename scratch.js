/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')



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

// -toInf issues
// framed
// bored



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
txt = "means"
txt = "I got tired of them"
txt = "poison cut the pen"
txt = "spaghetti and steamed rice"
txt = `we've gone`
txt = `the yankees have gone`
txt = `the yankees had gone`
txt = `we wrote`
let doc = nlp(txt)

// let h = doc.match('have')
// h.growRight('.').debug()
doc.verbs().toPresentTense()
// console.log(doc.verbs().conjugate())
doc.debug()
console.log(doc.text())
// console.log(doc.json()[0])

// doc.verbs().toPastTense()
// console.log(doc.verbs().conjugate())


// let doc = nlp(txt)
// doc.debug()
// let doc = nlp('five hundred fifty nine is more than fifty')
// doc.values().toNumber()
// doc.debug()


// let doc = nlp(`yeah. one extra two match here three`)
// let m = doc.match('match here')
// doc.remove('extra')
// m.docs
// doc.match(m).debug()
// doc.debug()

// doc = nlp('buy')



// let m = nlp('one two three. foo.')
// m = m.splitOn('two')
// m.match('three').remove()
// m.debug()

// let doc = nlp('once told me')
// let m = doc.match('once')
// doc.insertBefore('somebody')
// m.debug()
// 'once'


