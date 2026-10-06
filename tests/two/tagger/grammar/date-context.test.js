import test from 'tape'
import assertSpec from '../../_spec.js'
const here = '[two/tagger/grammar/date-context] '

test(here + 'two/tagger/date-context: written date values', t => {
  assertSpec(t, `
# second-pass cleanup: written date values
on May twenty five {Prep,Month,TextValue|Date,TextValue|Date}
by June twenty two {Prep,Month,TextValue|Date,TextValue|Date}
until August thirty one {Prep,Month,TextValue|Date,TextValue|Date}
`)
  t.end()
})

test(here + 'two/tagger/date-context: weekday month and ordinal dates', t => {
  assertSpec(t, `
# rule cleanup: weekday month and ordinal dates
Wednesday June 5th {WeekDay|Date,Month|Date,Ordinal|Date}
Monday August 12th {WeekDay|Date,Month|Date,Ordinal|Date}
Friday September 20th {WeekDay|Date,Month|Date,Ordinal|Date}
`)
  t.end()
})

test(here + 'two/tagger/date-context: month and numeric range dates', t => {
  assertSpec(t, `
# rule cleanup: month and numeric range dates
August 20-21 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
June 5–7 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
September 12-14 {Month|Date,NumberRange|Date,Conjunction|Date,NumberRange|Date}
`)
  t.end()
})

test(here + 'two/tagger/date-context: written day values after months', t => {
  assertSpec(t, `
# (#TextValue && #Date) #TextValue
May twenty five. {Date,TextValue|Date,TextValue|Date}
June twenty one. {Date,TextValue|Date,TextValue|Date}
`)
  t.end()
})
