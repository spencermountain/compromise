//rules for combining three terms into one
module.exports = [
  // {
  //   //john f kennedy
  //   condition: (a, b, c) => (a.tag.Person && b.term.isAcronym() && c.tag.Noun),
  //   result: 'Person',
  //   reason: 'Name-Initial-Capital'
  // },
  {
    //John & Joe's
    condition: (a, b, c) => (a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun),
    result: 'Person',
    reason: 'Noun-&-Noun'
  },
  // {
  //   //President of Mexico
  //   condition: (a, b, c) => (a.tag.TitleCase && b.normal === 'of' && c.tag.TitleCase),
  //   result: 'Noun',
  //   reason: 'Capital-of-Capital'
  // },
  {
    //three-word quote
    condition: (a, b, c) => (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'Three-word-quote'
  },
  {
    //1 800 PhoneNumber
    condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.PhoneNumber && b.normal.length === 3 && a.normal.length < 3),
    result: 'PhoneNumber',
    reason: '1-800-PhoneNumber'
  },
// {
//   //two hundred sixty three
//   condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-Value-Value'
// },
// {
//   //two hundred and three
//   condition: (a, b, c) => (a.tag.Value && b.normal === 'and' && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-and-Value'
// },
// {
//   //two point three
//   condition: (a, b, c) => (a.tag.Value && b.normal === 'point' && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-point-Value'
// }
];
