'use strict';
//apply lumper+splitter words to terms to combine them
const combine = require('./combine').two;

//not just 'Noun', but something more deliberate
const is_specific = function(t) {
  const specific = [
    'Person',
    'Place',
    'Value',
    'Date',
    'Organization',
  ];
  for(let i = 0; i < specific.length; i++) {
    if (t.pos[specific[i]]) {
      return true;
    }
  }
  return false;
};

//rules that combine two words
const do_lump = [
  {
    condition: (a, b) => (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
    result: 'Person',
    reason: 'person-words'
  },
  {
    //6 am
    condition: (a, b) => ((a.pos.Value || a.pos.Date) && (b.normal === 'am' || b.normal === 'pm')),
    result: 'Date',
    reason: 'date-am/pm'
  },
  {
    //'Dr. John'
    condition: (a, b) => (a.pos.Honourific && b.is_capital()),
    result: 'Person',
    reason: 'person-honourific'
  },
  {
    // "john lkjsdf's"
    condition: (a, b) => (a.pos.Person && b.pos.Possessive),
    result: 'Person',
    reason: 'person-possessive'
  },
  {
    //"John Abcd" - needs to be careful
    condition: (a, b) => (a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.has_comma() && b.is_capital() && !a.is_acronym() && !b.pos.Verb), //'Person, Capital -> Person'
    result: 'Person',
    reason: 'person-titleCase'
  },
  {
    //June 4
    condition: (a, b) => (a.pos.Date && b.pos.Value),
    result: 'Date',
    reason: 'date-value'
  },
  {
    //4 June
    condition: (a, b) => (a.pos.Value && b.pos.Date),
    result: 'Date',
    reason: 'value-date'
  },
  {
    //last wednesday
    condition: (a, b) => ((a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.pos.Date),
    result: 'Date',
    reason: 'relative-date'
  },
  {
    //Aircraft designer
    condition: (a, b) => (a.pos.Noun && b.pos.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  },
  {
    //Canada Inc
    condition: (a, b) => (a.is_capital() && a.pos.Noun && b.pos['Organization'] || b.is_capital() && a.pos['Organization']),
    result: 'Organization',
    reason: 'organization-org'
  },
  {
    //two-word quote
    condition: (a, b) => (a.text.match(/^["']/) && b.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'two-word-quote'
  },
  {
    //will walk (perfect)
    condition: (a, b) => (a.normal === 'will' && b.pos.Verb),
    result: 'PerfectTense',
    reason: 'will-verb'
  },
  {
    //will have walked (pluperfect)
    condition: (a, b) => (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb),
    result: 'PluperfectTense',
    reason: 'will-have-verb'
  },
  {
    //timezones
    condition: (a, b) => (b.normal.match(/(standard|daylight|summer) time/) && (a.pos['Adjective'] || a.pos['Place'])),
    result: 'Date',
    reason: 'timezone'
  },
  {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.pos.Demonym && b.pos.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  },
  {
    //for verbs in Past/Present Continuous ('is raining')
    condition: (a, b) => (a.pos.Copula && a.normal.match(/^(am|is|are|was|were)$/)
      && b.pos.Verb && b.normal.match(/ing$/)),
    result: 'Verb',
    reason: 'copula-gerund'
  },
  {
    //7 ft
    condition: (a, b) => ((a.pos.Value && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Value)),
    result: 'Value',
    reason: 'value-abbreviation'
  },
  {
    //NASA Flordia
    condition: (a, b) => ((a.pos.Noun && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Noun)),
    result: 'Noun',
    reason: 'noun-abbreviation'
  },
  {
    //both dates
    condition: (a, b) => (a.pos.Date && b.pos.Date),
    result: 'Date',
    reason: 'two-dates'
  },
  {
    //both values
    condition: (a, b) => (a.pos.Value && b.pos.Value),
    result: 'Value',
    reason: 'two-values'
  },
  {
    //both places
    condition: (a, b) => (a.pos.Place && b.pos.Place),
    result: 'Place',
    reason: 'two-places'
  },
  {
    //'have not'
    condition: (a, b) => ((a.pos.Infinitive || a.pos.Copula || a.pos.PresentTense) && b.normal === 'not'),
    result: 'Verb',
    reason: 'verb-not'
  },
  {
    //both places (this is the most aggressive rule of them all)
    condition: (a, b) => (a.pos.Noun && b.pos.Noun && !is_specific(a) && !is_specific(b)),
    result: 'Noun',
    reason: 'two-nouns'
  },
];

//exceptions or guards to the above rules, more or less
const dont_lump = [
  { //don't chunk non-word things with word-things
    condition: (a, b) => (a.is_word() === false || b.is_word() === false),
    reason: 'not a word',
  },
  {
    //if A has a comma, don't chunk it, (unless it's a date)
    condition: (a) => (a.has_comma() && !a.pos.Date),
    reason: 'has a comma',
  },
  { //dont chunk over possessives, eg "spencer's house"
    condition: (a) => (a.pos['Possessive']),
    reason: 'has possessive',
  },
  {
    condition: (a) => (a.pos['Expression'] || a.pos['Phrasal'] || a.pos['Pronoun']),
    reason: 'unchunkable pos',
  },
  { //dont chunk contractions (again)
    condition: (a, b) => (a.expansion || b.expansion),
    reason: 'is contraction',
  },
  { //"Toronto Montreal"
    condition: (a, b) => (a.pos['City'] && b.pos['City']),
    reason: 'two cities',
  },
  { //"Canada Cuba"
    condition: (a, b) => (a.pos['Country'] && b.pos['Country']),
    reason: 'two countries',
  },
  { //"John you"
    condition: (a, b) => (a.pos['Person'] && b.pos['Pronoun']),
    reason: 'person-pronoun',
  },
  { //url singleton
    condition: (a, b) => (a.pos['Url'] || b.pos['Url']),
    reason: 'url-no-lump',
  },
  { //Hashtag singleton
    condition: (a, b) => (a.pos['Hashtag'] || b.pos['Hashtag']),
    reason: 'hashtag-no-lump',
  },
  { //Email singleton
    condition: (a, b) => (a.pos['Email'] || b.pos['Email']),
    reason: 'email-no-lump',
  },
  { //Quotation singleton
    condition: (a, b) => (a.pos['Quotation'] || b.pos['Quotation']),
    reason: 'quotation-no-lump',
  },
];

//check lumping 'blacklist'
const ignore_pair = function(a, b) {
  for(let o = 0; o < dont_lump.length; o++) {
    if (dont_lump[o].condition(a, b)) {
      return true;
    }
  }
  return false;
};

//pairwise-compare two terms (find the 'twosies')
const lump_two = function(terms) {
  //each term..
  for(let i = 0; i < terms.length; i++) {
    let a = terms[i];
    let b = terms[i + 1];
    if (!a || !b) {
      continue;
    }
    //first check lumping 'blacklist'
    if (ignore_pair(a, b)) {
      continue;
    }
    //check each lumping rule
    for(let o = 0; o < do_lump.length; o++) {
      //should it combine?
      if (do_lump[o].condition(a, b)) {
        let new_tag = do_lump[o].result;
        let reason = do_lump[o].reason;
        // console.log(a.normal);
        // console.log(a.pos);
        terms = combine(terms, i, new_tag, 'chunked ' + reason);
        break;
      }
    }
  }
  //remove empties
  terms = terms.filter((t) => t);
  return terms;
};

module.exports = lump_two;
