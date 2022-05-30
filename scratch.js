/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

// let doc = nlp('one match two three')
// let a = doc.match('match two')
// let b = a.remove('two')
// console.log(a)
// // a.debug()
// // b.debug()
// console.log(b)

// nlp(` from malnutrition, chest diseases, cardiovascular disorders, skin problems, infectious diseases and the aftereffects of assaults and rape.`).debug()

// [
//   [ '#Adjective+ <Noun>', 3642 ],
//   [ '(the|this) <Noun>', 3524 ],
//   [ '(#Noun && @hasHyphen) #PresentTense', 2751 ],
//   [ '#Determiner #Adjective+ #Noun', 2672 ],
//   [ '#Verb [#Pronoun] #Determiner', 2326 ],
//   [ '#Adverb+ {Verb}', 2274 ],
//   [ '{Verb} #Adverb+', 2274 ],
//   [ '#Determiner [%Adj|Noun%] #Noun', 2093 ],
//   [ '[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)', 1942 ],
//   [ '#Singular and #Determiner? #Singular', 1780 ],
//   [ '<Noun> of #Determiner? #Noun', 1658 ],
//   [ '(the|these) [#Singular] (were|are)', 1553 ],
//   [ '(#Value|a) [(buck|bucks|grand)]', 1408 ],
//   [ '#Noun in #Determiner? #Noun', 1404 ],
//   [ '#Verb [to] #Adverb? #Infinitive', 1400 ],
//   [ '%Person|Date% #Acronym? #ProperNoun', 1309 ],
//   [ '%Person|Noun% #Acronym? #ProperNoun', 1309 ],
//   [ '%Person|Verb% #Acronym? #ProperNoun', 1309 ],
//   [ '[%Person|Verb%] (#Adverb|#Comparative)', 1284 ],
//   [ '#Copula #Adverb+? [#Adjective]', 1262 ],
//   [ '#Copula [#Adjective]', 1262 ],
//   [
//     '#Copula (#Adverb|not)+? [(be|being|been)] #Adverb+? #PastTense',
//     1252
//   ],
//   [ '#Adjective and #Adjective', 1228 ],
//   [ '#Adjective #Adjective [#PresentTense]', 1184 ],
//   [ '#Adverb [%Person|Verb%]', 1182 ],
//   [ '^[#Infinitive] (your|my|the|some|a|an)', 1137 ],
//   [ '(the|this|a|an) [#Infinitive] #Adverb? #Verb', 1109 ],
//   [ '(the|those|these|a|an) #Adjective? [#Infinitive]', 1071 ],
//   [ 'the [#Verb] #Preposition .', 1069 ],
//   [ '^[#Infinitive] (#Adjective|#Adverb)$', 1058 ],
//   [ '#Determiner [#Infinitive] #Noun', 1041 ],
//   [
//     '#Verb [(out|for|through|about|around|in|down|up|on|off)] #Preposition',
//     1005
//   ],


import fs from 'fs'
let file = `/Users/spencer/data/infinite-jest/infinite-jest.txt`
file = `/Users/spencer/mountain/compromise/plugins/speed/tests/files/freshPrince.txt`
let txt = fs.readFileSync(file).toString()
txt = `that is completely untrue.`
let doc = nlp(txt)
doc.debug('chunks')
// console.log('done')

// let doc = nlp('one two three four')
// let m = doc.match('one two three')
// m.tag('. #Person .')
// console.log(doc._cache)
// doc.match('#Person').debug()

// let net = nlp.buildNet([
//   { match: 'every single #Noun' },
//   { match: 'not (a|one) #Singular' },
// ])
// let doc = nlp('i saw every single house. i met none. ')
// doc.match(net).debug()
// let m = nlp([['first.', 'foo bar']]).debug()
// let matches = [
//   { match: 'third' },
// ]
// let net = nlp.buildNet(matches)
// let doc = nlp(`first. second. third`)
// doc = doc.reverse()
// let res = doc.sweep(net)
// console.log(res.view)
// res.view.soften()
// res.view.debug()
// res.found[0].view.debug()



// res.found[0].view.debug()

// doc = nlp(`first. second. third`)
// doc = doc.reverse()
// res = doc.match('third')
// console.log(res)



// console.log(res.found[0].view)

// let doc = nlp(`first. second. third`)
// doc = doc.reverse()
// let m = doc.match('third')
// m.soften()
// console.log(m)
// m.debug()



// conjugation issues
// let txt = ''
// txt = 'i will go on a boat'
// txt = `why is the doc`
// txt = 'take part'
// txt = 'fulfil'
// txt = 'outgrow'
// txt = 'prod'
// txt = 'shun'
// txt = 'slam'
// txt = 'collide'
// let doc = nlp(txt)
// doc.debug()
// console.log(doc.verbs().conjugate()[0])



// nlp('it is green and he is friendly.').sentences().toFutureTense().debug()

// isSingular bug
// nlp(`i saw the game that the Toronto Maple Leafs won`).verbs().isSingular().debug()


// contraction issue
// let txt = `doesn't there's i'd i'll`
// let doc = nlp(txt).debug()



// let doc = nlp("the exploding returns")
// console.log(nlp.parseMatch('québec'))
// doc.debug()
// const doc = nlp("Steve talked to Johnson LLC")
// doc.debug()
// Normal: some common drugs conflatin aspirin statin statins ivermectin amoxicillin augmentin

