import test from 'tape'
import nlp from './_lib.js'

test('dates plugin preserves core component exclusions', function (t) {
  const tags = ['Month', 'WeekDay', 'Year', 'FinancialQuarter', 'Season', 'Time', 'Timezone']
  tags.forEach(first => {
    tags.filter(second => second !== first).forEach(second => {
      const doc = nlp('xyz').unTag('*').tag(first)
      t.notOk(doc.canBe(second).found, `${first} excludes ${second} after plugin registration`)
    })
  })
  const doc = nlp('Christmas Day')
  t.ok(doc.match('day').has('(#Holiday && #Duration)'), 'holiday span retains the duration unit')
  t.ok(nlp('Q2 2025').has('#FinancialQuarter #Year'), 'quarter and year retain their separate tags')
  t.ok(nlp('3pm EST').has('#Time #Timezone'), 'time and timezone retain their separate tags')
  t.ok(nlp('May 5, 2020').has('#Month (#Value && #Date) #Year'), 'date components retain numeric values')
  t.end()
})
