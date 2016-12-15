'use strict';
const timezones = {
  standard: true,
  daylight: true,
  summer: true,
  eastern: true,
  pacific: true,
  central: true,
  mountain: true,
};

//rules that combine two words
module.exports = [
  // {
  //   condition: (a, b) => ((a.tag.Person && b.tag.Honorific) || (a.tag.Honorific && b.tag.Person)), //"John sr."
  //   result: 'Person',
  //   reason: 'person-words'
  // },
  // {
  //   condition: (a, b) => (a.tag.Person && b.tag.Person && !a.tag.Comma), //john stewart
  //   result: 'Person',
  //   reason: 'firstname-firstname'
  // },
  // {
  //   //'Dr. John'
  //   condition: (a, b) => (a.tag.Honorific && b.tag.TitleCase),
  //   result: 'Person',
  //   reason: 'person-honorific'
  // },
  // {
  //   // "john lkjsdf's"
  //   condition: (a, b) => (a.tag.Person && b.tag.tagsessive),
  //   result: 'Person',
  //   reason: 'person-possessive'
  // },
  // {
  //   //"John Abcd" - needs to be careful
  //   condition: (a, b) => (a.tag.Person && !a.tag.Pronoun && !a.tag.tagsessive && !a.term.hasComma() && b.tag.TitleCase && !a.term.isAcronym() && !b.tag.Verb), //'Person, Capital -> Person'
  //   result: 'Person',
  //   reason: 'person-titleCase'
  // },
  {
    //6 am
    condition: (a, b) => (a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve')),
    result: 'Holiday',
    reason: 'holiday-day'
  }, {
    //Aircraft designer
    condition: (a, b) => (a.tag.Noun && b.tag.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  }, {
    //Canada Inc
    condition: (a, b) => (a.tag.TitleCase && a.tag.Noun && b.tag['Organization'] || b.tag.TitleCase && a.tag['Organization']),
    result: 'Organization',
    reason: 'organization-org'
  }, {
    //two-word quote
    condition: (a, b) => (a.text.match(/^["']/) && b.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'two-word-quote'
  }, {
    //timezones
    condition: (a, b) => (timezones[a.normal] && (b.normal === 'standard time' || b.normal === 'time')),
    result: 'Time',
    reason: 'timezone'
  }, {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.tag.Demonym && b.tag.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  }, {
    //(454) 232-9873
    condition: (a, b, c) => (a.tag.NumericValue && b.tag.PhoneNumber && a.normal.length <= 3),
    result: 'PhoneNumber',
    reason: '(800) PhoneNumber'
  },
  // {
  //   //NASA Flordia
  //   condition: (a, b) => ((a.tag.Noun && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Noun)),
  //   result: 'Noun',
  //   reason: 'noun-abbreviation'
  // },

  // {
  //   //7 ft
  //   condition: (a, b) => ((a.tag.Value && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Value)),
  //   result: 'Value',
  //   reason: 'value-abbreviation'
  // },
  // {
  //   //a hundred
  //   condition: (a, b) => ((a.normal === 'a' || a.normal === 'an') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'determiner-value'
  // }, {
  //   //minus two
  //   condition: (a, b) => ((a.normal === 'minus' || a.normal === 'negative') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'minus-value'
  // }, {
  //   //six grand
  //   condition: (a, b) => (a.tag.Value && b.normal === 'grand'),
  //   result: 'Value',
  //   reason: 'value-grand'
  // },
  // {
  //   //fourth quarter
  //   condition: (a, b) => (a.tag.Ordinal && (b.normal === 'half' || b.normal === 'quarter')),
  //   result: 'Value',
  //   reason: 'half-value'
  // }, {
  //   //half a million
  //   condition: (a, b) => ((a.normal === 'half' || a.normal === 'quarter') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'half-value'
  // },
  // {
  //   //both values, not ordinals, not '5 20'
  //   condition: (a, b) => (a.tag.Value && b.tag.Value && !a.tag.Ordinal && !b.tag.NumericValue),
  //   result: 'Value',
  //   reason: 'two-values'
  // },
  // {
  //   //both places
  //   condition: (a, b) => (a.tag.Place && b.tag.Place),
  //   result: 'Place',
  //   reason: 'two-places'
  // },
  // {
  //   //
  //   condition: (a, b) => (a.normal === 'air' && b.tag.Country),
  //   result: 'Company',
  //   reason: 'air-country'
  // }

];
