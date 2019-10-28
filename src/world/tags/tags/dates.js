module.exports = {
  //not a noun, but usually is
  Date: {
    notA: ['Verb', 'Conjunction', 'Adverb', 'Preposition', 'Adjective'],
  },
  Month: {
    isA: ['Date', 'Singular'],
    notA: ['Year', 'WeekDay', 'Time'],
  },
  WeekDay: {
    isA: ['Date', 'Noun'],
  },
  Year: {
    isA: ['Date'],
    notA: 'RomanNumeral',
  },
  Duration: {
    isA: ['Date', 'Noun'],
  },
  Time: {
    isA: ['Date', 'Noun'],
    notA: 'Value',
  },
  Holiday: {
    isA: ['Date', 'Noun'],
  },
}
