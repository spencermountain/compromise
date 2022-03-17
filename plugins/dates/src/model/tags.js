export default {
  FinancialQuarter: {
    is: 'Date',
    not: ['Fraction'],
  },
  // 'summer'
  Season: {
    is: 'Date',
  },
  // '1982'
  Year: {
    is: 'Date',
    not: ['RomanNumeral'],
  },
  // 'easter'
  Holiday: {
    is: 'Date',
    also: 'Noun',
  },
  // 'two weeks before'
  DateShift: {
    is: 'Date',
    not: ['Timezone', 'Holiday'],
  },
}
