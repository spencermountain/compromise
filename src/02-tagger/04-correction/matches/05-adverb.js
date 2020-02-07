module.exports = [
  //still good
  { match: '[still] #Adjective', group: 0, tag: 'Adverb', reason: 'still-advb' },
  //still make
  { match: '[still] #Verb', group: 0, tag: 'Adverb', reason: 'still-verb' },
  { match: '[so] #Adjective', group: 0, tag: 'Adverb', reason: 'so-adv' }, //so the
  { match: '[all] #Verb', group: 0, tag: 'Adverb', reason: 'all-verb' }, //remind john that
  { match: '#Verb [like]', group: 0, tag: 'Adverb', reason: 'verb-like' },
  //barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  //cheering hard - dropped -ly's
  { match: '#PresentTense [(hard|quick|long|bright|slow)]', group: 0, tag: 'Adverb', reason: 'lazy-ly' },
  { match: '[much] #Adjective', group: 0, tag: 'Adverb', reason: 'bit-1' },
]
