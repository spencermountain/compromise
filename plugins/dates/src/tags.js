module.exports = {
  FinancialQuarter: {
    isA: 'Date',
  },
  Season: {
    isA: 'Date',
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
  Timezone: {
    isA: ['Date', 'Noun'],
  },
}
