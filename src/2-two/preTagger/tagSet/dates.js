// Calendar/clock components are distinct. Holiday and Duration describe spans
// that can overlap components or one another (for example, 'Christmas Day').
// Each exclusion pair is declared once; the tag compiler supplies reciprocity.
export default {
  Date: {
    not: ['Verb', 'Adverb', 'Adjective'],
  },
  Month: {
    is: 'Date',
    also: ['Noun'],
    not: ['WeekDay', 'Year', 'FinancialQuarter', 'Season', 'Time', 'Timezone'],
  },
  WeekDay: {
    is: 'Date',
    also: ['Noun'],
    not: ['Year', 'FinancialQuarter', 'Season', 'Time', 'Timezone'],
  },
  Year: {
    is: 'Date',
    not: ['RomanNumeral', 'FinancialQuarter', 'Season', 'Time', 'Timezone'],
  },
  FinancialQuarter: {
    is: 'Date',
    not: ['Fraction', 'Season', 'Time', 'Timezone'],
  },
  // 'easter'
  Holiday: {
    is: 'Date',
    also: ['Noun'],
  },
  // 'summer'
  Season: {
    is: 'Date',
    not: ['Time', 'Timezone'],
  },
  Timezone: {
    is: 'Date',
    also: ['Noun'],
    not: ['ProperNoun'],
  },
  Time: {
    is: 'Date',
    not: ['AtMention', 'Timezone'],
  },
  // 'months'
  Duration: {
    is: 'Date',
    also: ['Noun'],
  },
}
