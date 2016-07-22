'use strict';
//rules that combine two words
module.exports = [
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
    condition: (a, b) => (a.pos.Honourific && b.info('TitleCase')),
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
    condition: (a, b) => (a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.has_comma() && b.info('TitleCase') && !a.is_acronym() && !b.pos.Verb), //'Person, Capital -> Person'
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
    condition: (a, b) => (a.info('TitleCase') && a.pos.Noun && b.pos['Organization'] || b.info('TitleCase') && a.pos['Organization']),
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
    result: 'Pluperfect',
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
  }
];
