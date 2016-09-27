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
    reason: 'Value-point-Value'
  }
];
