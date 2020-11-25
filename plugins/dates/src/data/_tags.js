module.exports = {
  FinancialQuarter: {
    isA: 'Date',
  },
  // 'summer'
  Season: {
    isA: 'Date',
  },
  // '1982'
  Year: {
    isA: ['Date'],
    notA: 'RomanNumeral',
  },
  // 'months'
  Duration: {
    isA: ['Date', 'Noun'],
  },
  // 'easter'
  Holiday: {
    isA: ['Date', 'Noun'],
  },
  // 'PST'
  Timezone: {
    isA: ['Date', 'Noun'],
    notA: ['Adjective', 'DateShift'],
  },
  // 'two weeks before'
  DateShift: {
    isA: ['Date'],
    notA: ['TimeZone', 'Holiday'],
  },
}
