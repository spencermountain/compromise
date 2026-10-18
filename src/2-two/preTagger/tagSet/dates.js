import {
  Vb,
  Adv,
  Adj,
  Date,
  NN,
  WeekDay,
  Year,
  FinancialQuarter,
  Season,
  Time,
  Timezone,
  RomanNumeral,
  Frac,
  Prop,
  AtMention,
} from './_lib.js'

// Calendar/clock components are distinct. Holiday and Duration describe spans
// that can overlap components or one another (for example, 'Christmas Day').
// Each exclusion pair is declared once; the tag compiler supplies reciprocity.
export default {
  Date: {
    not: [Vb, Adv, Adj],
  },
  Month: {
    is: Date,
    also: [NN],
    not: [WeekDay, Year, FinancialQuarter, Season, Time, Timezone],
  },
  WeekDay: {
    is: Date,
    also: [NN],
    not: [Year, FinancialQuarter, Season, Time, Timezone],
  },
  Year: {
    is: Date,
    not: [RomanNumeral, FinancialQuarter, Season, Time, Timezone],
  },
  FinancialQuarter: {
    is: Date,
    aliases: [null, 'Quarter'],
    not: [Frac, Season, Time, Timezone],
  },
  // 'easter'
  Holiday: {
    is: Date,
    also: [NN],
  },
  // 'summer'
  Season: {
    is: Date,
    not: [Time, Timezone],
  },
  Timezone: {
    is: Date,
    aliases: [null, 'Tz'],
    also: [NN],
    not: [Prop],
  },
  Time: {
    is: Date,
    not: [AtMention, Timezone],
  },
  // 'months'
  Duration: {
    aliases: [null, 'Dur'],
    is: Date,
    also: [NN],
  },
}
