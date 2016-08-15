
//exceptions or guards to the above rules, more or less
module.exports = [
  { //don't chunk non-word things with word-things
    condition: (a, b) => (a.is('wordlike') === false || b.info('wordlike') === false),
    reason: 'not a word'
  },
  {
    //if A has a comma, don't chunk it, (unless it's a date)
    condition: (a) => (a.info('hasComma') && !a.pos.Date),
    reason: 'has a comma'
  },
  { //dont chunk over possessives, eg "spencer's house"
    condition: (a) => (a.pos['Possessive']),
    reason: 'has possessive'
  },
  {
    condition: (a) => (a.pos['Expression'] || a.pos['Phrasal'] || a.pos['Pronoun']),
    reason: 'unchunkable pos'
  },
  { //dont chunk contractions (again)
    condition: (a, b) => (a.expansion || b.expansion),
    reason: 'is contraction'
  },
  { //"Toronto Montreal"
    condition: (a, b) => (a.pos['City'] && b.pos['City']),
    reason: 'two cities'
  },
  { //"Canada Cuba"
    condition: (a, b) => (a.pos['Country'] && b.pos['Country']),
    reason: 'two countries'
  },
  { //"John you"
    condition: (a, b) => (a.pos['Person'] && b.pos['Pronoun']),
    reason: 'person-pronoun'
  },
  { //url singleton
    condition: (a, b) => (a.pos['Url'] || b.pos['Url']),
    reason: 'url-no-lump'
  },
  { //Hashtag singleton
    condition: (a, b) => (a.pos['Hashtag'] || b.pos['Hashtag']),
    reason: 'hashtag-no-lump'
  },
  { //Email singleton
    condition: (a, b) => (a.pos['Email'] || b.pos['Email']),
    reason: 'email-no-lump'
  },
  { //Quotation singleton
    condition: (a, b) => (a.pos['Quotation'] || b.pos['Quotation']),
    reason: 'quotation-no-lump'
  }
];
