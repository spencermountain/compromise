
//exceptions or guards to the above rules, more or less
module.exports = [
  { //don't chunk non-word things with word-things
    condition: (a, b) => (a.is('word') === false || b.info('word') === false),
    reason: 'not a word'
  },
  {
    //if A has a comma, don't chunk it, (unless it's a date)
    condition: (a) => (a.info('hasComma') && !a.tag.Date),
    reason: 'has a comma'
  },
  { //dont chunk over possessives, eg "spencer's house"
    condition: (a) => (a.tag['Possessive']),
    reason: 'has possessive'
  },
  {
    condition: (a) => (a.tag['Expression'] || a.tag['Phrasal'] || a.tag['Pronoun']),
    reason: 'unchunkable pos'
  },
  { //dont chunk contractions (again)
    condition: (a, b) => (a.expansion || b.expansion),
    reason: 'is contraction'
  },
  { //"Toronto Montreal"
    condition: (a, b) => (a.tag['City'] && b.tag['City']),
    reason: 'two cities'
  },
  { //"Canada Cuba"
    condition: (a, b) => (a.tag['Country'] && b.tag['Country']),
    reason: 'two countries'
  },
  { //"John you"
    condition: (a, b) => (a.tag['Person'] && b.tag['Pronoun']),
    reason: 'person-pronoun'
  },
  { //url singleton
    condition: (a, b) => (a.tag['Url'] || b.tag['Url']),
    reason: 'url-no-lump'
  },
  { //Hashtag singleton
    condition: (a, b) => (a.tag['Hashtag'] || b.tag['Hashtag']),
    reason: 'hashtag-no-lump'
  },
  { //Email singleton
    condition: (a, b) => (a.tag['Email'] || b.tag['Email']),
    reason: 'email-no-lump'
  },
  { //Quotation singleton
    condition: (a, b) => (a.tag['Quotation'] || b.tag['Quotation']),
    reason: 'quotation-no-lump'
  }
];
