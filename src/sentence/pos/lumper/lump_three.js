'use strict';

const do_lump = [
  {
    condition: (a, b, c) => (a.pos.Noun && b.text === '&' && c.pos.Noun), //John & Joe's
    result: 'Person',
  },
  {
    condition: (a, b, c) => (a.pos.Noun && b.text === 'N' && c.pos.Noun), //John N Joe's
    result: 'Person',
  },
  {
    condition: (a, b, c) => (a.pos.Date && b.normal === 'the' && c.pos.Value), //June the 5th
    result: 'Date',
  },
  {
    condition: (a, b, c) => (a.pos.Value && b.pos.Preposition && c.pos.Date), //June the 5th
    result: 'Date',
  },
  {
    condition: (a, b, c) => (a.pos.Date && b.pos.Preposition && c.pos.Value), //June 5th to 7th
    result: 'Date',
  },
  {
    condition: (a, b, c) => (a.is_capital() && b.normal === 'of' && c.is_capital()), //President of Mexico
    result: 'Noun',
  },
  {
    condition: (a, b, c) => (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)), //three-word quote
    result: 'Noun',
  },
  {
    condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.pos.Verb), //will have walk
    result: 'FutureTense',
  },
  {
    condition: (a, b, c) => (a.pos.Date && (c.pos.Date || c.pos.Ordinal) && (b.pos.Preposition || b.pos.Determiner || b.pos.Conjunction || b.pos.Adjective)), //3hrs after 5pm
    result: 'Date',
  },
  {
    condition: (a, b, c) => (a.pos.Value && b.normal === 'and' && c.pos.Value), //two hundred and three
    result: 'Value',
  }
];


const lump_three = function(terms) {
  for(let i = 0; i < terms.length; i++) {

  }
  return;
};

module.exports = lump_three;
