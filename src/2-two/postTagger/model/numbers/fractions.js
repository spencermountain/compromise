export default [
  // [half] a penny
  { match: '[half] of? (a|an)', group: 0, tag: 'Fraction', reason: 'half-a' },
  // [quarter] of a dollar
  { match: '[quarter] of? (a|an)', group: 0, tag: 'Fraction', reason: 'quarter-a' },
  // nearly [half]
  // left-right: { match: '#Adverb [half]', group: 0, tag: 'Fraction', reason: 'nearly-half' },
  // [half] the
  // left-right: { match: '[half] the', group: 0, tag: 'Fraction', reason: 'half-the' },
  // two and a half
  { match: '#Cardinal and a half', tag: 'Fraction', reason: 'and-a-half' },
  // two-halves
  { match: '#Value (halves|halfs|quarters)', tag: 'Fraction', reason: 'two-halves' },

  // [seven] fifths
  { match: '[#Cardinal+] (#Fraction && /s$/)', group: 0, tag: 'Fraction', reason: 'seven-fifths' },
  // [one third] of it
  { match: '[#Cardinal+ #Ordinal] of .', group: 0, tag: 'Fraction', reason: 'ord-of' },
  // [100th] of it
  { match: '[(#NumericValue && #Ordinal)] of .', group: 0, tag: 'Fraction', reason: 'num-ord-of' },
  // [a twenty fifth] of it
  { match: '[(a|one) #Cardinal?+ #Ordinal] of', group: 0, tag: 'Fraction', reason: 'a-ord' },

  // a sixteenth, one twenty fifth (without a following noun)
  { match: '[(a|one) #Cardinal+? (#Ordinal && !first && !second)]$', group: 0, tag: 'Fraction', reason: 'solo-fraction' },

  // 3 out of 5
  { match: '#Cardinal+ out? of every? #Cardinal', tag: 'Fraction', reason: 'out-of' },
]
