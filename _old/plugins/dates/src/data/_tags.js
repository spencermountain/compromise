module.exports = {
  FinancialQuarter: {
    isA: 'Date',
    notA: 'Fraction',
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
  // 'easter'
  Holiday: {
    isA: ['Date', 'Noun'],
  },
  // 'two weeks before'
  DateShift: {
    isA: ['Date'],
    notA: ['TimeZone', 'Holiday'],
  },
}
