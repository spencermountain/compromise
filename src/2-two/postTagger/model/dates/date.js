export default [
  // ==== WeekDay ====
  // [sun] the 5th
  { match: '[sun] the #Ordinal', group: 0, tag: 'WeekDay', reason: 'sun-the-5th' },
  // 1pm next [sun]
  { match: '#Date (on|this|next|last|during)? [sun]', group: 0, tag: 'WeekDay', reason: '1pm-sun' },
  // on [sat]
  { match: `(in|by|before|during|on|until|after|of|within|all) [sat]`, group: 0, tag: 'WeekDay', reason: 'sat' },

  // ==== Month ====
  // in [march]
  { match: `#Preposition [(march|may)]`, group: 0, tag: 'Month', reason: 'in-month' },
  // this march
  { match: '(this|next|last) march !#Infinitive?', tag: '#Date #Month', reason: 'this-march' },
  // this may
  { match: '(this|next|last) may !#Infinitive?', tag: '#Date #Month', reason: 'this-may' },
  // march 5th
  { match: `(march|may) the? #Value`, tag: '#Month #Date #Date', reason: 'march-5th' },
  // 5th of march
  { match: `#Value of? (march|may)`, tag: '#Date #Date #Month', reason: '5th-of-march' },
  // [march] and feb
  { match: `[(march|may)] .? #Date`, group: 0, tag: 'Month', reason: 'march-and-feb' },
  // feb to [march]
  { match: `#Date .? [(march|may)]`, group: 0, tag: 'Month', reason: 'feb-and-march' },
  // quickly [march]
  { match: `#Adverb [(march|may)]`, group: 0, tag: 'Verb', notIf: '(early|late)', reason: 'quickly-march' },
  // 12 am
  { match: `#Value (am|pm)`, tag: 'Time', reason: '2-am' },
]
