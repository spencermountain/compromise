import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/postTagger/date-boundaries] '

test(here + 'second-pass cleanup: date numbers do not leak into other sentences', t => {
  const ordinary = ['May ended. Twenty five apples remained.', 'June began. Thirty one people arrived.', 'August ended. Twenty two birds left.']
  ordinary.forEach(text => {
    const values = nlp(text).match('#TextValue')
    t.ok(values.found, `${text}: written numbers are present`)
    t.notOk(values.has('#Date'), `${text}: separate sentence numbers are not dates`)
  })
  t.end()
})
