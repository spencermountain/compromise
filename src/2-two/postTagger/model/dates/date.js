export default [
  // ==== WeekDay ====
  // sun the 5th
  { match: '[sun] the #Ordinal', hook: 'sun', tag: 'WeekDay', reason: 'sun-the-5th' },
  // sun feb 2
  { match: '[sun] #Date', hook: 'sun', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
  // 1pm next sun
  { match: '#Date (on|this|next|last|during)? [sun]', hook: 'sun', group: 0, tag: 'WeekDay', reason: '1pm-sun' },
  // on sat
  { match: `(in|by|before|during|on|until|after|of|within|all) [sat]`, hook: 'sat', group: 0, tag: 'WeekDay', reason: 'sat' },
  // on wed
  { match: `(in|by|before|during|on|until|after|of|within|all) [wed]`, hook: 'wed', group: 0, tag: 'WeekDay', reason: 'wed' },
  // in march
  { match: `(in|by|before|during|on|until|after|of|within|all) [march]`, hook: 'march', group: 0, tag: 'Month', reason: 'march' },
  // sat november
  { match: '[sat] #Date', hook: 'sat', group: 0, tag: 'WeekDay', reason: 'sat-feb' },

  // ==== Month ====
  // in march
  { match: `#Preposition [(march|may)]`, hook: '#Preposition', group: 0, tag: 'Month', reason: 'in-month' },
  // this march
  { match: '(this|next|last) march !#Infinitive?', hook: 'march', tag: '#Date #Month', reason: 'this-month' },
  // this may
  { match: '(this|next|last) may !#Infinitive?', hook: 'may', tag: '#Date #Month', reason: 'this-month' },
  // march 5th
  { match: `(march|may) the? #Value`, hook: '#Value', tag: '#Month #Date #Date', reason: 'march-5th' },
  // 5th of march
  { match: `#Value of? (march|may)`, hook: '#Value', tag: '#Date #Date #Month', reason: '5th-of-march' },
  // march and feb
  { match: `[(march|may)] .? #Date`, hook: '#Date', group: 0, tag: 'Month', reason: 'march-and-feb' },
  // feb to march
  { match: `#Date .? [(march|may)]`, hook: '#Date', group: 0, tag: 'Month', reason: 'feb-and-march' },
  // quickly march
  { match: `#Adverb [(march|may)]`, hook: '#Adverb', group: 0, tag: 'Verb', reason: 'quickly-march' },
  // march quickly
  { match: `[(march|may)] #Adverb`, hook: '#Adverb', group: 0, tag: 'Verb', reason: 'march-quickly' },
  // 12 am
  { match: `#Value (am|pm)`, hook: '#Value', tag: 'Time', reason: '2-am' },
]
