//rules for combining three terms into one
module.exports = [
  {
    //john f kennedy
    condition: (a, b, c) => (a.tag.Person && b.is('Acronym') && c.tag.Noun),
    result: 'Person',
    reason: 'Name-Initial-Capital'
  },
  {
    //John & Joe's
    condition: (a, b, c) => (a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun),
    result: 'Person',
    reason: 'Noun-&-Noun'
  },
  // {
  //   //June the 5th
  //   condition: (a, b, c) => (a.tag.Date && b.normal === 'the' && c.tag.Value),
  //   result: 'Date',
  //   reason: 'Date-the-Value'
  // },
  // {
  //   //5th of June
  //   condition: (a, b, c) => (a.tag.Value && (b.tag.Conjunction || b.tag.Preposition) && c.tag.Date),
  //   result: 'Date',
  //   reason: 'Value-Prep-Date'
  // },
  // {
  //   //June 5th to 7th
  //   condition: (a, b, c) => (a.tag.Date && (b.tag.Conjunction || b.tag.Preposition) && c.tag.Value),
  //   result: 'Date',
  //   reason: 'Date-Preposition-Value'
  // },
  // {
  //   //3hrs after 5pm
  //   condition: (a, b, c) => (a.tag.Date && (c.tag.Date || c.tag.Ordinal) && (b.tag.Preposition || b.tag.Determiner || b.tag.Conjunction || b.tag.Adjective)),
  //   result: 'Date',
  //   reason: 'Date-Preposition-Date'
  // },
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
  //   condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.tag.Verb),
  //   result: 'FutureTense',
  //   reason: 'will-have-Verb'
  // },

  {
    //two hundred and three
    condition: (a, b, c) => (a.tag.Value && b.normal === 'and' && c.tag.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  },
  {
    //two point three
    condition: (a, b, c) => (a.tag.Value && b.normal === 'point' && c.tag.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  }
];
