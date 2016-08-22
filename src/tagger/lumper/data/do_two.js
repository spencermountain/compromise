'use strict';
//rules that combine two words
module.exports = [
  {
    condition: (a, b) => (a.tag.Person && b.tag.Honourific || a.tag.Honourific && b.tag.Person), //"John sr."
    result: 'Person',
    reason: 'person-words'
  },
  {
    //6 am
    condition: (a, b) => ((a.tag.Value || a.tag.Date) && (b.normal === 'am' || b.normal === 'pm')),
    result: 'Date',
    reason: 'date-am/pm'
  },
  {
    //'Dr. John'
    condition: (a, b) => (a.tag.Honourific && b.is('TitleCase')),
    result: 'Person',
    reason: 'person-honourific'
  },
  {
    // "john lkjsdf's"
    condition: (a, b) => (a.tag.Person && b.tag.tagsessive),
    result: 'Person',
    reason: 'person-possessive'
  },
  {
    //"John Abcd" - needs to be careful
    condition: (a, b) => (a.tag.Person && !a.tag.Pronoun && !a.tag.tagsessive && !a.info('hasComma') && b.is('TitleCase') && !a.is('Acronym') && !b.tag.Verb), //'Person, Capital -> Person'
    result: 'Person',
    reason: 'person-titleCase'
  },
  // {
  //   //June 4
  //   condition: (a, b) => (a.tag.Date && b.tag.Value),
  //   result: 'Date',
  //   reason: 'date-value'
  // },
  // {
  //   //4 June
  //   condition: (a, b) => (a.tag.Value && b.tag.Date),
  //   result: 'Date',
  //   reason: 'value-date'
  // },
  {
    //last wednesday
    condition: (a, b) => ((a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.tag.Date),
    result: 'Date',
    reason: 'relative-date'
  },
  {
    //Aircraft designer
    condition: (a, b) => (a.tag.Noun && b.tag.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  },
  {
    //Canada Inc
    condition: (a, b) => (a.is('TitleCase') && a.tag.Noun && b.tag['Organization'] || b.is('TitleCase') && a.tag['Organization']),
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
    //timezones
    condition: (a, b) => (b.normal.match(/(standard|daylight|summer) time/) && (a.tag['Adjective'] || a.tag['Place'])),
    result: 'Date',
    reason: 'timezone'
  },
  {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.tag.Demonym && b.tag.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  },
  {
    //7 ft
    condition: (a, b) => ((a.tag.Value && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Value)),
    result: 'Value',
    reason: 'value-abbreviation'
  },
  {
    //NASA Flordia
    condition: (a, b) => ((a.tag.Noun && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Noun)),
    result: 'Noun',
    reason: 'noun-abbreviation'
  },
  // {
  //   //both dates
  //   condition: (a, b) => (a.tag.Date && b.tag.Date),
  //   result: 'Date',
  //   reason: 'two-dates'
  // },
  // {
  //   //dates and values
  //   condition: (a, b) => (a.tag.Date && b.tag.Value),
  //   result: 'Date',
  //   reason: 'date-value'
  // },
  {
    //both values, not ordinals, not '5 20'
    condition: (a, b) => (a.tag.Value && b.tag.Value && !a.tag.Ordinal && !b.tag.Ordinal && !(a.tag.Cardinal && b.tag.Cardinal)),
    result: 'Value',
    reason: 'two-values'
  },
  {
    //both places
    condition: (a, b) => (a.tag.Place && b.tag.Place),
    result: 'Place',
    reason: 'two-places'
  }

];
