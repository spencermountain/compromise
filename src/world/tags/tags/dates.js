module.exports = {
  Date: {}, //not a noun, but usually is
  Month: {
    isA: ['Date', 'Singular'],
  },
  WeekDay: {
    isA: ['Date', 'Noun'],
  },
  Year: {
    isA: ['Date'],
  },
  Duration: {
    isA: ['Date', 'Noun'],
  },
  Time: {
    isA: ['Date', 'Noun'],
  },
  Holiday: {
    isA: ['Date', 'Noun'],
  },
}
