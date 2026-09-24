export default [
  // half a penny
  { match: '[half] of? (a|an)', hook: 'half', group: 0, tag: 'Fraction', reason: 'millionth' },
  { match: '[quarter] of? (a|an)', hook: 'quarter', group: 0, tag: 'Fraction', reason: 'millionth' },
  // nearly half
  { match: '#Adverb [half]', hook: 'half', group: 0, tag: 'Fraction', reason: 'nearly-half' },
  // half the
  { match: '[half] the', hook: 'half', group: 0, tag: 'Fraction', reason: 'half-the' },
  // and a half
  { match: '#Cardinal and a half', hook: 'half', tag: 'Fraction', reason: 'and-a-half' },
  // two-halves
  { match: '#Value (halves|halfs|quarters)', hook: '#Value', tag: 'Fraction', reason: 'two-halves' },

  // ---ordinals as fractions---
  // a fifth
  { match: 'a #Ordinal', hook: 'a', tag: 'Fraction', reason: 'a-quarter' },
  // seven fifths
  { match: '[#Cardinal+] (#Fraction && /s$/)', hook: '#Fraction', tag: 'Fraction', reason: 'seven-fifths' },
  // doc.match('(#Fraction && /s$/)').lookBefore('#Cardinal+$').tag('Fraction')
  // one third of ..
  { match: '[#Cardinal+ #Ordinal] of .', hook: 'of', group: 0, tag: 'Fraction', reason: 'ordinal-of' },
  // 100th of
  { match: '[(#NumericValue && #Ordinal)] of .', hook: 'of', group: 0, tag: 'Fraction', reason: 'num-ordinal-of' },
  // a twenty fifth
  { match: '(a|one) #Cardinal?+ #Ordinal', hook: '#Ordinal', tag: 'Fraction', reason: 'a-ordinal' },

  // //  '3 out of 5'
  { match: '#Cardinal+ out? of every? #Cardinal', hook: 'of', tag: 'Fraction', reason: 'out-of' },
]

// {match:'', tag:'',reason:''},
