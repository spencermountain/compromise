//words that can't be compressed, for whatever reason
module.exports = {
  // numbers
  '20th century fox': 'Organization',
  '3m': 'Organization',
  '7 eleven': 'Organization',
  '7-eleven': 'Organization',
  g8: 'Organization',
  'motel 6': 'Organization',
  vh1: 'Organization',
  q1: 'Date',
  q2: 'Date',
  q3: 'Date',
  q4: 'Date',

  //misc
  records: 'Plural',
  '&': 'Conjunction',
  was: ['Copula', 'PastTense'],

  //pronouns
  i: ['Pronoun', 'Singular'],
  he: ['Pronoun', 'Singular'],
  she: ['Pronoun', 'Singular'],
  it: ['Pronoun', 'Singular'],
  // 'me',
  // 'him',
  // 'her',
  they: ['Pronoun', 'Plural'],
  we: ['Pronoun', 'Plural'],
  // 'them',
  // 'ourselves',
  // 'us',
}
