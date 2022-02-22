/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

let plg = {
  tags: {
    FemaleNoun: {
      is: 'Noun'
    }
  }
}
nlp.plugin(plg)

// nlp.verbose('tagger')

/*

*/
//  #Noun (%Noun|Verb% && #Verb)


let txt = "non plentiful"
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
let doc = nlp('i found the stylo on the table.')
// console.log(nlp.model().one.lexicon.buy)
// doc.verbs().toPresentTense()
// doc.verbs().toFutureTense()
// console.log(doc.verbs().conjugate())
// doc.debug()


let nouns = doc.nouns()
console.log(doc.html({
  blue: nouns
}))






// doc.redact().debug()
// console.log(doc.text())
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


