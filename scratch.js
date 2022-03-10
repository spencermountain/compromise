/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

/*

*/
//  #Noun (%Noun|Verb% && #Verb)

// txt = "quiet relaunch"
// txt = "president-elect"
// txt = "another fool to roast"
// txt = "There's holes everywhere"
// txt = "another fool to roast"
// txt = "favourite place in tampa"
// txt = "and has soft music playing"
// txt = "Good place to be"
// txt = "provide weekly updates on the status"
// txt = "Number of suspected al-Qa'ida members"
// txt = " THE premier university"
// txt = " THE favourite fruit"
// txt = " New York style pizza"
// txt = " 200,000 guns means 1000 tonnes"
// txt = "means"
// txt = "I got tired of them"
// txt = "poison cut the pen"
// txt = "spaghetti and steamed rice"
// txt = `we've gone`
// txt = `the yankees have gone`
// txt = `the yankees had gone`
// txt = `we wrote`
// // feb 17
// txt = `They read Mickey Spillane and talk about Groucho`
// txt = `address`
// txt = `flown`
// txt = `misinform`
// txt = `relaunch`
// txt = `inbred`
// txt = `there is gender bias in sickness`
// txt = `for draft contract`
// txt = `Why doesn't Mike Tyson play Playstation`
// txt = `and a mysterious cracking sound,`
// txt = `pressure on the terrorist countries `
// txt = `a major stumbling block to industrial growth`

let doc = nlp(`one match two.`)
doc.fork()
doc.compute('preTagger')
doc.debug()

