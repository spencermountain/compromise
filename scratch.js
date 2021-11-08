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


let txt
// txt= 'Characters drink Salty Dogs, whistle Johnny B. Goode and watch Bugs Bunny reruns.'
// txt= " It was full of violence and gangs and kids cutting class, says Linda Ward, the school's principal."
// txt= 'But Learning Materials matched on 66.5 of 69 subskills.'
// txt= 'They operate ships and banks.'
// txt= ' Bob has handled the extraordinary growth of the company quite brilliantly, said Mr. Newhouse.'
// txt= 'A stadium craze is sweeping the country.'
// txt= 'The cells were operating in the Ghazaliyah and al-Jihad districts of the capital.'
// txt= 'But they, too, failed.'
// txt= 'The Communist party has the largest number of registered party members in the country and can be considered as the oldest popular political party in Iraq.'
// txt= 'You really got me thinking, I enjoy reading this blog.'
// txt= 'He clearly enjoyed, as governor, watching executions.'
// txt= 'He has clearly gone on enjoying killing people on a large scale in Iraq.'
// txt= 'The wikipedia entry for Aerocom is just a stub .. waiting for someone to put some information into it ....'
// txt= 'It is trying to play ice hockey by sending a ballerina ice-skater into the ring or to knock out a heavyweight boxer by a chess player.'
// txt= 'Al Qaeda, Anthrax and Ayman: Means, Motive, Modus Operandi and Opportunity'
// txt= 'At one time, some thought he had been spotted in Iran.'
// txt= 'Would dinner Thursday work instead.'
// txt= 'Job Group: Specialist'
// txt= 'Mark, I thought you would enjoy the comment about you.'
// txt= 'Does that work for you?'
// txt= 'Mark and Steve -'
// txt= 'Thursday works for me.'
// txt= 'She is going to be a kinesiologist, sports injury therapist.'
// txt= 'Does that work?'
// txt= 'Day One Interviews Day Two Interviews'
// txt = 'Sue and Jeff --'
// txt= 'Has Liz finished with gathering the documents?'
// txt= 'Increases longevity.'
// txt= 'The Superdome stadium is without power, and toilets are overflowing.'
// txt= 'You are requesting a legitimate service and you are paying for it !!'
// txt= 'Visit message boards and post this article as a new message by highlighting the text of this letter and selecting paste from the edit menu.'
// txt= "680 - Number of suspected al-Qa'ida members that the United States admits are detained at Guantánamo Bay, Cuba."
// txt = 'YOU have to spend the time training.'
// txt= 'Need Advice !?'
// txt= 'The federal sites of Washington, DC.'
// txt= 'Boiled WHITE rice and boiled chicken breast.'
// txt= 'The ship offers variety of eatables, deliciously made.'
// txt= 'There are many online sites offering the booking facility with affordable rates.'
// txt= 'I know this is going to be expensive.'
// txt= 'Needs to go out of business'
// txt= 'Clean, updated room, friendly staff, safe location.'
// txt= 'Provided me with warm blanket and has soft music playing.'
// txt= 'The auto mechanics that work for Auto Towing are very friendly and informative and answered any question I had.'
// txt= 'A very satisfied new customer!'
// txt= 'As a very satisfied new customer, I wholeheartedly recommend United Air Duct Cleaning.'
// txt= 'The staff is incredibly friendly and helpful and the owner, Mimmy, is an absolute angel.'
// txt= 'I had a conversation with the woman running this place in April 2010.'
// txt= 'Great Cookies, Cakes, and Customer Service'
// txt= 'May, 2009.'

// let doc = nlp(txt).debug()

// bug 1
// txt = `he out-lived`
txt = `he out lived`
txt = `pseudo clean`
txt = `he was anti cleaning`
// txt = `he was anti cleaning`
let doc = nlp(txt)
console.log(doc.verbs().json()[0])
doc.verbs().toFutureTense()
doc.debug()



/*




(#Noun && @hasHyphen) #Verb







*/
