import test from 'tape'
import nlp from '../_lib.js'
import spacetime from 'spacetime'

const here = '[plugins/dates/arithmetic-roundtrip] '
const options = { today: '2020-06-01', timezone: 'UTC' }

test(here + 'rounded instants should not expand into ranges', t => {
  const cases = [
    ['2020-06-05T12:30:45.123Z', 1.5, 'hours'],
    ['2020-12-31T23:59:59.999Z', 1.5, 'hours'],
    ['2020-12-31T23:59:59.999Z', 0.5, 'minutes'],
  ]
  cases.forEach(([input, amount, unit]) => {
    const expected = spacetime(input, options.timezone).add(amount, unit).subtract(amount, unit).format('iso')
    const after = nlp(input).dates(options).add(amount, unit).subtract(amount, unit).get(0)
    t.equal(after?.end, expected, `${input}: ${amount} ${unit}, precise end`)
  })
  t.end()
})
