'use strict';
const combine = require('./combine').three;

// const dont_lump = [
// {
//   condition: (a, b, c) => (),
//   reason: ''
// },
// ];

const do_lump = [
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
    condition: (a, b, c) => (a.is_capital() && b.normal === 'of' && c.is_capital()),
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
    //will have walk
    condition: (a, b, c) => (a.normal === 'will' && b.normal === 'have' && c.pos.Verb),
    result: 'FutureTense',
    reason: 'will-have-Verb'
  },

  {
    //two hundred and three
    condition: (a, b, c) => (a.pos.Value && b.normal === 'and' && c.pos.Value),
    result: 'Value',
    reason: 'Value-and-Value'
  }
];

const lump_three = function(terms) {
  //fail-fast
  if (terms.length < 3) {
    return terms;
  }
  for(let i = 0; i < terms.length - 2; i++) {
    let a = terms[i];
    let b = terms[i + 1];
    let c = terms[i + 2];
    if (!a || !b || !c) {
      continue;
    }
    for(let o = 0; o < do_lump.length; o++) {
      if (do_lump[o].condition(a, b, c)) {
        let new_tag = do_lump[o].result;
        let reason = do_lump[o].reason;
        terms = combine(terms, i, new_tag, reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter((t) => t);
  return terms;
};

module.exports = lump_three;
