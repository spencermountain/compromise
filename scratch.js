/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

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

// txt = " It was full of violence and gangs and kids cutting class, says Linda Ward, the school's principal."
// txt = 'They operate ships and banks.'
// txt = ' Bob handled quite brilliantly.'
// txt = 'But they, too, failed.'
//  txt= 'You really got me thinking, I enjoy reading this blog.'
//  txt= 'He clearly enjoyed, as governor, watching executions.'
// txt = 'He has clearly gone on enjoying '
//  txt= 'At one time, some thought he had been spotted in Iran.'
//  txt= 'Would dinner Thursday work instead.'
//  txt= 'Mark, I thought you would enjoy the comment about you.'
//  txt= 'Does that work for you?'
//  txt= 'Mark and Steve -'
//  txt= 'Thursday works for me.'
//  txt= 'Does that work?'
//  txt= 'CONGRATULATIONS !!!!!!!'
//  txt= 'Again, congratulations.'
//  txt= 'Congratulations.'
//  txt= 'Congratulations and good luck.'
//  txt= 'bob k'
//  txt= 'Day One Interviews Day Two Interviews'
//  txt= 'Sue and Jeff --'
//  txt= 'Are you playing golf?'
//  txt= 'Has Liz finished with gathering the documents?'
//  txt= 'Increases longevity.'
// txt = 'hey kido u made me smile'
// txt = 'spend the time training.'
//  txt= 'Hope it helps!'
//  txt= 'Do dogs enjoy watching T.V.?'
//  txt= 'Need Advice !?'
//  txt= 'The federal sites of Washington, DC.'
//  txt= 'Boiled WHITE rice and boiled chicken breast.'
// txt = 'The ship offers variety of things.'
// txt = 'many online sites offering the booking.'
// txt = 'I know this is going to be expensive.'
// txt = 'and it works!'
// txt = 'she needs to develop a personality!'
// txt = 'Provided me with warm blanket and has soft music playing.'
// txt = 'the woman running this place'

// txt = 'May, (2009) foo'
// txt = 'She is amazing.'



// let doc = nlp(txt).debug()

// txt = "i met April O'neil"
// txt = "Pope John Paul II"
// txt = "Mel Brooks"

// txt = "clothing"
txt = "#cool fun.com @cooman"
txt = `i hear the children crying`
txt = `Okay, you broke my fridge`
// txt = "it was redefining"
// txt = "distressing us"
// txt = "it was disgusting"
// txt = "quite awfully dashing"
// txt = "rallied"
// txt = "Fundo ltd."
// txt = "we help stop tragedies"
// txt = "seek progress"
// txt = "the aging process"
// txt = "the euro challenge to"
// txt = "is shocking"
// txt = "closed it"
// txt = "charity chapman"
// txt = "cut costs"
// txt = "defeating his longstanding rivals"
// txt = "the feminine"
// txt = "I'm fuckin' around with two geese"
// txt = "without laughing"
// txt = "babysitting sucks"
// txt = "manufacturing returned"
// txt = "appeal court"
// txt = "The difference is astounding."
// txt = "super-cool"
// txt = "and help minimize the loss of life"
txt = "He then got up, opened his arms wide"

// let doc = nlp(txt)
// doc.debug()
// console.log(doc.verbs().json()[1])
// let arr = [

//   ["resold", "resell"],

//   ["blitzed", "blitz"],
// ]
// let doc = nlp(arr[arr.length - 1][0]).debug()
// doc.verbs().toInfinitive()
// console.log(doc.text())

txt = `i felt used`
// txt = `I know those guys are earning their keep`

let doc = nlp(txt)
doc.debug()
// doc.verbs().if('include').subjects().debug()
// doc.debug('chunks')
// doc.nouns().debug()

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




(#Noun && @hasHyphen) #Verb







*/
