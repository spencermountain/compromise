const personDate = '(april|june|may|jan|august|eve)'
const personMonth = '(january|april|may|june|jan|sep)'
const personAdj = '(misty|rusty|dusty|rich|randy|young)'
const personVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const personPlace = '(darwin|hamilton|paris|alexandria|houston|kobe|santiago|salvador|sydney|victoria)'
const firstName = '(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)'
const lastName = '(green|white|brown|hall|young|king|hill|cook|gray|price)'
const personNoun =
  '(art|baker|berg|bill|brown|charity|chin|christian|cliff|daisy|dawn|dick|dolly|faith|franco|gene|green|hall|hill|holly|hope|jean|jewel|joy|kelvin|king|kitty|lane|lily|melody|mercedes|miles|olive|penny|ray|reed|robin|rod|rose|sky|summer|trinity|van|viola|violet|wang|white)'

export default [
  //ambiguous-but-common firstnames
  {
    match: `[${firstName}] #LastName`,
    group: 0,
    tag: 'FirstName',
    reason: 'maybe-lastname',
  },
  //very common-but-ambiguous lastnames
  {
    match: `#FirstName ${lastName}`,
    tag: 'Person',
    reason: 'bill-green',
  },

  // ===person-noun===
  // faith smith
  { match: `${personNoun} #Person`, tag: 'Person', reason: 'ray-smith', safe: true },
  // faith m. Smith
  { match: `${personNoun} #Acronym? #ProperNoun`, tag: 'Person', reason: 'ray-a-smith', safe: true },
  // Paris Berelc
  { match: `[${personPlace}] #ProperNoun`, group: 0, ifNo: '#Place', tag: 'FirstName', reason: 'place-firstname' },

  // ===person-date===
  // in june
  { match: `(in|during|on|by|after|#Date) [${personDate}]`, group: 0, tag: 'Date', reason: 'in-june' },
  // june 1992
  { match: `${personDate} (#Value|#Date)`, tag: 'Date', reason: 'june-5th' },
  // June Smith
  { match: `${personDate} #ProperNoun`, tag: 'Person', reason: 'june-smith', safe: true },
  // june m. Cooper
  { match: `${personDate} #Acronym? #ProperNoun`, tag: 'Person', ifNo: '#Month', reason: 'june-smith-jr' },
  // ---person-month---
  //give to april
  {
    match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${personMonth}]`,
    group: 0,
    tag: 'Person',
    reason: 'ambig-person',
  },
  // remind june
  { match: `#Infinitive [${personMonth}]`, group: 0, tag: 'Person', reason: 'infinitive-person' },
  // april will
  { match: `[${personMonth}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' },
  // would april
  { match: `#Modal [${personMonth}]`, group: 0, tag: 'Person', reason: 'modal-ambig' },
  // it is may
  { match: `#Copula [${personMonth}]`, group: 0, tag: 'Person', reason: 'is-may' },
  // may is
  { match: `[${personMonth}] #Copula`, group: 0, tag: 'Person', reason: 'may-is' },
  // with april
  { match: `(that|with|for) [${personMonth}]`, group: 0, tag: 'Person', reason: 'that-month' },
  // may 5th
  { match: `[${personMonth}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' },
  // 5th of may
  { match: `#Value of [${personMonth}]`, group: 0, tag: 'Month', reason: '5th-of-may' },

  // ===person-adjective===
  // rusty smith
  { match: `${personAdj} #Person`, tag: 'Person', reason: 'randy-smith' },
  // rusty a. smith
  { match: `${personAdj} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rusty-smith' },
  // very rusty
  { match: `#Adverb [${personAdj}]`, group: 0, tag: 'Adjective', reason: 'really-rich' },

  // ===person-verb===
  // would wade
  { match: `#Modal [${personVerb}]`, group: 0, tag: 'Verb', reason: 'would-mark' },
  { match: `#Adverb [${personVerb}]`, group: 0, tag: 'Verb', reason: 'really-mark' },
  // wade smith
  { match: `${personVerb} #Person`, tag: 'Person', reason: 'rob-smith' },
  // wade m. Cooper
  { match: `${personVerb} #Acronym #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },
  //to mark
  { match: '(to|#Modal) [mark]', group: 0, tag: 'PresentTense', reason: 'to-mark' },
]
