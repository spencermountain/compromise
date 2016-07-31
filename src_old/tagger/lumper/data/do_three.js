//rules for combining three terms into one
module.exports = [
  {
    //john f kennedy
    condition: (a, b, c) => (a.pos.Person && b.info('isAcronym') && c.pos.Noun),
    result: 'Person',
    reason: 'Name-Initial-Capital'
  },
  {
    //John & Joe's
    condition: (a, b, c) => (a.pos.Noun && (b.text === '&' || b.normal === 'n') && c.pos.Noun),
    result: 'Person',
    reason: 'Noun-&-Noun'
  },
  {
    //June the 5th
    condition: (a, b, c) => (a.pos.Date && b.normal === 'the' && c.pos.Value),
    result: 'Date',
    reason: 'Date-the-Value'
  },
  {
    //5th of June
    condition: (a, b, c) => (a.pos.Value && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Date),
    result: 'Date',
    reason: 'Value-Prep-Date'
  },
  {
    //June 5th to 7th
    condition: (a, b, c) => (a.pos.Date && (b.pos.Conjunction || b.pos.Preposition) && c.pos.Value),
    result: 'Date',
    reason: 'Date-Preposition-Value'
  },
  {
    //3hrs after 5pm
    condition: (a, b, c) => (a.pos.Date && (c.pos.Date || c.pos.Ordinal) && (b.pos.Preposition || b.pos.Determiner || b.pos.Conjunction || b.pos.Adjective)),
    result: 'Date',
    reason: 'Date-Preposition-Date'
  },
  {
    //President of Mexico
    condition: (a, b, c) => (a.is('titleCase') && b.normal === 'of' && c.is('titleCase')),
    result: 'Noun',
    reason: 'Capital-of-Capital'
  },
  {
    //three-word quote
    condition: (a, b, c) => (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)),
    result: 'Noun',
    reason: 'Three-word-quote'
  },
  // {
  //   //will have walk
  //   condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.pos.Verb),
  //   result: 'FutureTense',
  //   reason: 'will-have-Verb'
  // },

  {
    //two hundred and three
    condition: (a, b, c) => (a.pos.Value && b.normal === 'and' && c.pos.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  },
  {
    //two point three
    condition: (a, b, c) => (a.pos.Value && b.normal === 'point' && c.pos.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  }
];
