export default {
  Date: {
    not: ['Verb', 'Adverb', 'Adjective'],
  },
  Month: {
    is: 'Singular',
    also: ['Date'],
    not: ['Year', 'WeekDay', 'Time'],
  },
  WeekDay: {
    is: 'Noun',
    also: ['Date'],
  },
  Year: {
    is: 'Date',
    not: ['RomanNumeral'],
  },
  FinancialQuarter: {
    is: 'Date',
    not: 'Fraction',
  },
  // 'easter'
  Holiday: {
    is: 'Date',
    also: ['Noun'],
  },
  // 'summer'
  Season: {
    is: 'Date',
  },
  Timezone: {
    is: 'Noun',
    also: ['Date'],
    not: ['ProperNoun'],
  },
  Time: {
    is: 'Date',
    not: ['AtMention'],
  },
  // 'months'
  Duration: {
    is: 'Noun',
    also: ['Date'],
  },
}
