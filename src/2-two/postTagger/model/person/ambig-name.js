// const personDate = '(april|june|may|jan|august|eve)'
// const personMonth = '(january|april|may|june|jan|sep)'
const personAdj = '(misty|rusty|dusty|rich|randy|sandy|young|earnest|frank|brown)'
const personVerb = '(drew|pat|wade|ollie|will|rob|buck|bob|mark|jack)'

export default [
  // ===person-date===
  // in june
  // { match: `(in|during|on|by|after|#Date) [${personDate}]`, group: 0, tag: 'Date', reason: 'in-june' },
  // // june 1992
  // { match: `${personDate} (#Value|#Date)`, tag: 'Date', reason: 'june-5th' },
  // // June Smith
  // { match: `${personDate} #ProperNoun`, tag: 'Person', reason: 'june-smith', safe: true },
  // // june m. Cooper
  // { match: `${personDate} #Acronym? #ProperNoun`, tag: 'Person', ifNo: '#Month', reason: 'june-smith-jr' },
  // // ---person-month---
  // //give to april
  // {
  //   match: `#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${personMonth}]`,
  //   group: 0,
  //   tag: 'Person',
  //   reason: 'ambig-person',
  // },
  // // remind june
  // { match: `#Infinitive [${personMonth}]`, group: 0, tag: 'Person', reason: 'infinitive-person' },
  // // april will
  // { match: `[${personMonth}] #Modal`, group: 0, tag: 'Person', reason: 'ambig-modal' },
  // // would april
  // { match: `#Modal [${personMonth}]`, group: 0, tag: 'Person', reason: 'modal-ambig' },
  // // it is may
  // { match: `#Copula [${personMonth}]`, group: 0, tag: 'Person', reason: 'is-may' },
  // may is
  // { match: `[%Person|Date%] #Copula`, group: 0, tag: 'Person', reason: 'may-is' },
  // may the
  // { match: `[%Person|Date%] the`, group: 0, tag: 'Date', reason: 'may-the' },
  // of may
  // { match: `of [%Person|Date%]`, group: 0, tag: 'Date', reason: 'of-may' },
  // // with april
  // { match: `(that|with|for) [${personMonth}]`, group: 0, tag: 'Person', reason: 'that-month' },
  // // may 5th
  // { match: `[${personMonth}] the? #Value`, group: 0, tag: 'Month', reason: 'may-5th' },

  // ===person-noun===
  // { match: `[%Person|Noun%] (will|had|has|said|says|told|did|learned|wants|wanted)`, tag: 'Person', reason: 'person-said' },

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
  // drew closer
  { match: `[${personVerb}] (#Adverb|#Comparative)`, group: 0, tag: 'Verb', reason: 'drew-closer' },
  // wade smith
  { match: `${personVerb} #Person`, tag: 'Person', reason: 'rob-smith' },
  // wade m. Cooper
  { match: `${personVerb} #Acronym #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },
  //to mark
  // { match: '(to|#Modal) [mark]', group: 0, tag: 'PresentTense', reason: 'to-mark' },
  // will go
  { match: '[will] #Verb', group: 0, tag: 'Modal', reason: 'will-verb' },
]
