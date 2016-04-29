//fancy combining/chunking of terms
'use strict';
const pos = require('./parts_of_speech');

const shouldLumpThree = function(a, b, c) {
  if (!a || !b || !c) {
    return false;
  }
  //some weak-pos

  const lump_rules = [
    {
      condition: (a.pos.Noun && b.text === '&' && c.pos.Noun), //John & Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Noun && b.text === 'N' && c.pos.Noun), //John N Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.normal === 'the' && c.pos.Value), //June the 5th
      result: 'Date',
    },
    {
      condition: (a.pos.Value && b.pos.Preposition && c.pos.Date), //June the 5th
      result: 'Date',
    },
    {
      condition: (a.pos.Date && b.pos.Preposition && c.pos.Value), //June 5th to 7th
      result: 'Date',
    },
    {
      condition: (a.is_capital() && b.normal === 'of' && c.is_capital()), //President of Mexico
      result: 'Noun',
    },
    {
      condition: (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)), //three-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.normal === 'have' && b.pos.Verb), //will have walk
      result: 'FutureTense',
    },
    {
      condition: (a.pos.Date && (c.pos.Date || c.pos.Ordinal) && (b.pos.Preposition || b.pos.Determiner || b.pos.Conjunction || b.pos.Adjective)), //3hrs after 5pm
      result: 'Date',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};

const shouldLumpTwo = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //don't chunk non-word things with word-things
  if (a.is_word() === false || b.is_word() === false) {
    return false;
  }
  const lump_rules = [
    {
      condition: (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
      result: 'Person',
    },
    {
      condition: ((a.pos.Value || a.pos.Date) && (b.normal === 'am' || b.normal === 'pm')), //6 am
      result: 'Date',
    },
    {
      condition: (a.pos.Honourific && b.is_capital()), //'Dr. John
      result: 'Person',
    },
    {
      condition: (a.pos.Person && b.is_capital()), //'Person, Capital -> Person'
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.pos.Value), //June 4
      result: 'Date',
    },
    {
      condition: (a.pos.Value && b.pos.Date), //4 June
      result: 'Date',
    },
    {
      condition: ((a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.pos.Date), //last wednesday
      result: 'Date',
    },
    {
      condition: (a.pos.Noun && b.pos.Actor), //Aircraft designer
      result: 'Actor',
    },
    {
      condition: (a.pos.Value && b.pos.Noun && !a.pos.Ordinal), //5 books
      result: 'Value',
    },
    {
      condition: (a.is_capital() && b.pos['Organization'] || b.is_capital() && a.pos['Organization']), //Canada Inc
      result: 'Organization',
    },
    {
      condition: (a.text.match(/^["']/) && b.text.match(/["']$/)), //two-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.pos.Verb), //will walk (perfect)
      result: 'PerfectTense',
    },
    {
      condition: (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb), //will have walked (pluperfect)
      result: 'PluperfectTense',
    },
    //timezones
    {
      condition: (b.normal.match(/(standard|daylight|summer) time/) && (a.pos['Adjective'] || a.pos['Place'])),
      result: 'Date',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};


const fancy_lumping = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    let a = terms[i - 1];
    let b = terms[i];
    let c = terms[i + 1];

    // rules for lumping two terms
    let tag = shouldLumpTwo(a, b);
    if (tag) {
      let Cl = pos.classMapping[tag] || pos.Term;
      let space = a.whitespace.trailing + b.whitespace.preceding;
      // console.log(terms[i - 1]);
      // console.log(terms[i]);
      terms[i] = new Cl(a.text + space + b.text, tag);
      terms[i].reason = 'lumpedtwo(' + terms[i].reason + ')';
      terms[i].whitespace.preceding = a.whitespace.preceding;
      terms[i].whitespace.trailing = b.whitespace.trailing;
      terms[i - 1] = null;
      continue;
    }

    // rules for lumpting three terms
    if (c) {
      tag = shouldLumpThree(a, b, c);
      if (tag) {
        let Cl = pos.classMapping[tag] || pos.Term;
        let space1 = a.whitespace.trailing + b.whitespace.preceding;
        let space2 = b.whitespace.trailing + c.whitespace.preceding;
        let text = a.text + space1 + b.text + space2 + c.text;
        terms[i - 1] = new Cl(text, tag);
        terms[i - 1].reason = 'lumpedThree(' + terms[i].reason + ')';
        //transfer unused-up whitespace
        terms[i - 1].whitespace.preceding = a.whitespace.preceding;
        terms[i - 1].whitespace.trailing = c.whitespace.trailing;
        terms[i] = null;
        terms[i + 1] = null;
        continue;
      }
    }

  }
  //remove killed terms
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};


module.exports = fancy_lumping;
