let list = []

const places = '(paris|alexandria|houston|kobe|salvador|sydney)'
// in houston
list.push({ match: `in [${places}]`, group: 0, tag: 'Place', reason: 'in-paris' })
list.push({ match: `near [${places}]`, group: 0, tag: 'Place', reason: 'near-paris' })
list.push({ match: `at [${places}]`, group: 0, tag: 'Place', reason: 'at-paris' })
list.push({ match: `from [${places}]`, group: 0, tag: 'Place', reason: 'from-paris' })
list.push({ match: `to [${places}]`, group: 0, tag: 'Place', reason: 'to-paris' })
list.push({ match: `#Place [${places}]`, group: 0, tag: 'Place', reason: 'tokyo-paris' })
// houston texas
list.push({ match: `[${places}] #Place`, group: 0, tag: 'Place', reason: 'paris-france' })

const nouns =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
// faith smith
list.push({ match: `${nouns} #Person`, tag: 'Person', reason: 'ray-smith', safe: true })
// faith m. Smith
list.push({ match: `${nouns} #Acronym? #ProperNoun`, tag: 'Person', reason: 'ray-a-smith', safe: true })

const verbs = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
// would wade
list.push({ match: `#Modal [${verbs}]`, group: 0, tag: 'Verb', reason: 'would-mark' })
list.push({ match: `#Adverb [${verbs}]`, group: 0, tag: 'Verb', reason: 'really-mark' })
// wade smith
list.push({ match: `${verbs} #Person`, tag: 'Person', reason: 'rob-smith' })
// wade m. Cooper
list.push({ match: `${verbs} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' })

const adjectives = '(misty|rusty|dusty|rich|randy)'
// very rusty
list.push({ match: `#Adverb [${adjectives}]`, group: 0, tag: 'Adjective', reason: 'really-rich' })
// rusty smith
list.push({ match: `${adjectives} #Person`, tag: 'Person', reason: 'randy-smith' })
// rusty a. smith
list.push({ match: `${adjectives} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rusty-smith' })

//Dates: 'june' or 'may'
const dates = '(april|june|may|jan|august|eve)'
// in june
list.push({ match: `in [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
list.push({ match: `during [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
list.push({ match: `on [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
list.push({ match: `by [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
list.push({ match: `before [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
list.push({ match: `#Date [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' })
// June Smith
list.push({ match: `${dates} #ProperNoun`, tag: 'Person', reason: 'june-smith', safe: true })
// june 1992
list.push({ match: `${dates} #Value`, tag: 'Date', reason: 'june-5th' })
list.push({ match: `${dates} #Date`, tag: 'Date', reason: 'june-5th' })
// june m. Cooper
list.push({ match: `${dates} #Acronym? (#ProperNoun && !#Month)`, tag: 'Person', reason: 'june-smith-jr' })

const months = '(january|april|may|june|jan|sep)' //summer|autumn
//give to april
list.push({
  match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${months}]`,
  group: 0,
  tag: 'Person',
  reason: 'ambig-person',
})
// remind june
list.push({ match: `#Infinitive [${months}]`, group: 0, tag: 'Person', reason: 'infinitive-person' })
// may waits for
list.push({ match: `[${months}] #PresentTense for`, group: 0, tag: 'Person', reason: 'ambig-active-for' })
// may waits for
list.push({ match: `[${months}] #PresentTense to`, group: 0, tag: 'Person', reason: 'ambig-active-to' })
// april will
list.push({ match: `[${months}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' })
// would april
list.push({ match: `#Modal [${months}]`, group: 0, tag: 'Person', reason: 'modal-ambig' })
// it is may
list.push({ match: `#Copula [${months}]`, group: 0, tag: 'Person', reason: 'is-may' })
// may is
list.push({ match: `[${months}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' })
// wednesday april
list.push({ match: `#Date [${months}]`, group: 0, tag: 'Month', reason: 'date-may' }) //FIXME: autumn is not a month
// may 5th
list.push({ match: `[${months}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' })
// 5th of may
list.push({ match: `#Value of [${months}]`, group: 0, tag: 'Month', reason: '5th-of-may' })
// with april
list.push({ match: `that [${months}]`, group: 0, tag: 'Person', reason: 'that-month' })
list.push({ match: `with [${months}]`, group: 0, tag: 'Person', reason: 'with-month' })
list.push({ match: `for [${months}]`, group: 0, tag: 'Person', reason: 'for-month' })
// this april
list.push({ match: `this [${months}]`, group: 0, tag: 'Month', reason: 'this-may' }) //maybe not 'this'
list.push({ match: `next [${months}]`, group: 0, tag: 'Month', reason: 'next-may' }) //maybe not 'this'
list.push({ match: `last [${months}]`, group: 0, tag: 'Month', reason: 'last-may' }) //maybe not 'this'

module.exports = list
