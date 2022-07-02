//words that can't be compressed, for whatever reason
let misc = {
  // numbers
  '20th century fox': 'Organization',
  '7 eleven': 'Organization',
  'motel 6': 'Organization',
  g8: 'Organization',
  vh1: 'Organization',

  'km2': 'Unit',
  'm2': 'Unit',
  'dm2': 'Unit',
  'cm2': 'Unit',
  'mm2': 'Unit',
  'mile2': 'Unit',
  'in2': 'Unit',
  'yd2': 'Unit',
  'ft2': 'Unit',
  'm3': 'Unit',
  'dm3': 'Unit',
  'cm3': 'Unit',
  'in3': 'Unit',
  'ft3': 'Unit',
  'yd3': 'Unit',


  // ampersands
  'at&t': 'Organization',
  'black & decker': 'Organization',
  'h & m': 'Organization',
  'johnson & johnson': 'Organization',
  'procter & gamble': 'Organization',
  "ben & jerry's": 'Organization',
  '&': 'Conjunction',

  //pronouns
  i: ['Pronoun', 'Singular'],
  he: ['Pronoun', 'Singular'],
  she: ['Pronoun', 'Singular'],
  it: ['Pronoun', 'Singular'],
  they: ['Pronoun', 'Plural'],
  we: ['Pronoun', 'Plural'],
  was: ['Copula', 'PastTense'],
  is: ['Copula', 'PresentTense'],
  are: ['Copula', 'PresentTense'],
  am: ['Copula', 'PresentTense'],
  were: ['Copula', 'PastTense'],
  her: ['Possessive', 'Pronoun'],
  his: ['Possessive', 'Pronoun'],
  hers: ['Possessive', 'Pronoun'],
  their: ['Possessive', 'Pronoun'],
  themselves: ['Possessive', 'Pronoun'],
  your: ['Possessive', 'Pronoun'],
  our: ['Possessive', 'Pronoun'],
  my: ['Possessive', 'Pronoun'],
  its: ['Possessive', 'Pronoun'],

  // misc
  vs: ['Conjunction', 'Abbreviation'],
  if: ['Condition', 'Preposition'],
  closer: 'Comparative',
  closest: 'Superlative',
  much: 'Adverb',
  may: 'Modal',


  // irregular conjugations with two forms
  babysat: 'PastTense',
  blew: 'PastTense',
  drank: 'PastTense',
  drove: 'PastTense',
  forgave: 'PastTense',
  skiied: 'PastTense',
  spilt: 'PastTense',
  stung: 'PastTense',
  swam: 'PastTense',
  swung: 'PastTense',
  guaranteed: 'PastTense',
  shrunk: 'PastTense',

  no: ['Negative', 'Expression']
}
export default misc
