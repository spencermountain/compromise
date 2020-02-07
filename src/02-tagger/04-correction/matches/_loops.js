//blast-out programmatic match statements, based on a list
//based on our caching, this is actually faster to do.

const pipe = /\|/
let list = []

const units = 'hundred|thousand|million|billion|trillion|quadrillion'.split(pipe)
units.forEach(unit => {
  // thousand and two
  list.push({ match: `${unit}+ and #Value`, tag: 'Value', reason: 'magnitude-and-value' })
})

const maybeMonth = ['march', 'may']
maybeMonth.forEach(month => {
  //all march
  list.push({ match: `#Preposition [${month}]`, group: 0, tag: 'Month', reason: 'in-month' })
  //this march
  list.push({ match: `(next|this|last) [${month}]`, group: 0, tag: 'Month', reason: 'this-month' })
  // march 5th
  list.push({ match: `[${month}] the? #Value`, group: 0, tag: 'Month', reason: 'march-5th' })
  // 5th of march
  list.push({ match: `#Value of? [${month}]`, group: 0, tag: 'Month', reason: '5th-of-march' })
  // march and feb
  list.push({ match: `[${month}] .? #Date`, group: 0, tag: 'Month', reason: 'march-and-feb' })
  // feb to march
  list.push({ match: `#Date .? [${month}]`, group: 0, tag: 'Month', reason: 'feb-and-march' })
  //quickly march
  list.push({ match: `#Adverb [${month}]`, group: 0, tag: 'Infinitive', reason: 'quickly-march' })
  //march quickly
  list.push({ match: `${month} [#Adverb]`, group: 0, tag: 'Infinitive', reason: 'march-quickly' })
})

//Places: paris or syndey
const maybePlace = 'paris|alexandria|houston|kobe|salvador|sydney'.split(pipe)
maybePlace.forEach(place => {
  // in houston
  list.push({ match: '(in|near|at|from|to|#Place) [' + place + ']', group: 0, tag: 'Place', reason: 'in-paris' })
  // houston texas
  list.push({ match: '[' + place + '] #Place', group: 0, tag: 'Place', reason: 'paris-france' })
})

let maybeNoun = 'rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive'
maybeNoun += '|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity'
maybeNoun = maybeNoun.split(pipe)
maybeNoun.forEach(name => {
  // faith smith
  list.push({ match: name + ' #Person', tag: 'Person', reason: 'ray-smith', safe: true })
  // faith m. Smith
  list.push({ match: name + ' #Acronym? #ProperNoun', tag: 'Person', reason: 'ray-a-smith', safe: true })
})

const maybeVerb = 'pat|wade|ollie|will|rob|buck|bob|mark|jack'.split(pipe)
maybeVerb.forEach(verb => {
  // would wade
  list.push({ match: '(#Modal|#Adverb) [' + verb + ']', group: 0, tag: 'Verb', reason: 'would-mark' })
  // wade smith
  list.push({ match: verb + ' #Person', tag: 'Person', reason: 'rob-smith' })
  // wade m. Cooper
  list.push({ match: verb + ' #Acronym? #ProperNoun', tag: 'Person', reason: 'rob-a-smith' })
})

const maybeAdj = 'misty|rusty|dusty|rich|randy'.split(pipe)
maybeAdj.forEach(adj => {
  // very rusty
  list.push({ match: '#Adverb [' + adj + ']', group: 0, tag: 'Adjective', reason: 'really-rich' })
  // rusty smith
  list.push({ match: adj + ' #Person', tag: 'Person', reason: 'randy-smith' })
  // rusty a. smith
  list.push({ match: adj + ' #Acronym? #ProperNoun', tag: 'Person', reason: 'rusty-smith' })
})

//Dates: 'june' or 'may'
const maybeDate = 'april|june|may|jan|august|eve'.split(pipe)
maybeDate.forEach(date => {
  // June Smith
  list.push({ match: date + ' #ProperNoun', tag: 'Person', reason: 'june-smith', safe: true })
  // in june
  list.push({ match: '(in|during|on|by|before|#Date) [' + date + ']', group: 0, tag: 'Date', reason: 'in-june' })
  // june 1992
  list.push({ match: date + ' (#Date|#Value)', tag: 'Date', reason: 'june-5th' })
  // june m. Cooper
  list.push({ match: date + ' #Acronym? (#ProperNoun && !#Month)', tag: 'Person', reason: 'june-smith-jr' })
})

const people = 'january|april|may|june|summer|autumn|jan|sep'.split(pipe) //ambiguous month-names
people.forEach(name => {
  //give to april
  list.push({
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${name}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person',
  })
  // remind june
  list.push({ match: `#Infinitive [${name}]`, group: 0, tag: 'Person', reason: 'infinitive-person' })
  // may waits for
  list.push({ match: `[${name}] #PresentTense (to|for)`, group: 0, tag: 'Person', reason: 'ambig-active' })
  // april will
  list.push({ match: `[${name}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' })
  // would april
  list.push({ match: `#Modal [${name}]`, group: 0, tag: 'Person', reason: 'modal-ambig' })
  // it is may
  list.push({ match: `#Copula [${name}]`, group: 0, tag: 'Person', reason: 'is-may' })
  // may is
  list.push({ match: `[${name}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' })
  // wednesday april
  list.push({ match: `#Date [${name}]`, group: 0, tag: 'Month', reason: 'date-may' }) //FIXME: autumn is not a month
  // may 5th
  list.push({ match: `[${name}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' })
  // 5th of may
  list.push({ match: `#Value of [${name}]`, group: 0, tag: 'Month', reason: '5th-of-may' })
  // with april
  list.push({ match: `(that|with|for) [${name}]`, group: 0, tag: 'Person', reason: 'that-month' })
  // this april
  list.push({ match: `(next|this|last) [${name}]`, group: 0, tag: 'Month', reason: 'next-may' }) //maybe not 'this'
})

module.exports = list
