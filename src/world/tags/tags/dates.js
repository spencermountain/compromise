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

  Holiday: {
    isA: ['Date', 'Noun'],
  },
}
