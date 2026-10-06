import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/date-context] '

test(here + 'written date values', t => {
  assertSpec(t, `
# second-pass cleanup: written date values
on May twenty five {Prep,Month,TextValue|Date,TextValue|Date}
by June twenty two {Prep,Month,TextValue|Date,TextValue|Date}
until August thirty one {Prep,Month,TextValue|Date,TextValue|Date}
`)
  t.end()
})

test(here + 'weekday month and ordinal dates', t => {
  assertSpec(t, `
# rule cleanup: weekday month and ordinal dates
Wednesday June 5th {WeekDay|Date,Month|Date,Ordinal|Date}
Monday August 12th {WeekDay|Date,Month|Date,Ordinal|Date}
Friday September 20th {WeekDay|Date,Month|Date,Ordinal|Date}
`)
  t.end()
})

test(here + 'month and numeric range dates', t => {
  assertSpec(t, `
# rule cleanup: month and numeric range dates
August 20-21 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
June 5–7 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
September 12-14 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
`)
  t.end()
})

test(here + 'written day values after months', t => {
  assertSpec(t, `
# (#TextValue && #Date) #TextValue
May twenty five. {Date,TextValue|Date,TextValue|Date}
June twenty one. {Date,TextValue|Date,TextValue|Date}
`)
  t.end()
})

test(here + 'months, weekdays, date values and timezones', t => {
  assertSpec(t, `
On sat. {Prep,WeekDay}
In march. {Prep,Month}
This march. {Date,Month}
This may. {Date,Month}
March 5th. {Month,Date}
5th of march. {Date,Date,Month}
March and feb. {Month,Conj,Month}
Feb to march. {Month,Prep,Month}
Quickly march. {Adv,Inf}
12 am. {Time,Time}
5th of June. {Date,Date,Month}
5 June. {Date,Month}
June 5 to 7. {Month,Date,Date,Date}
June the 12th. {Month,Date,Date}
June 7. {Month,Date}
7 June. {Date,Month}
Aug 20-21. {Month,Date,Date,Date}
Wednesday June 5th. {WeekDay,Month,Date}
Aug 5th 2021. {Month,Date,Date}
China standard time. {Timezone,Timezone,Timezone}
Eastern time. {Timezone,Timezone}
Central european time. {Timezone,Timezone,Timezone}
`)
  t.end()
})
