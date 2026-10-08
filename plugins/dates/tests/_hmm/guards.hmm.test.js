import test from 'tape'
import { isDeepStrictEqual } from 'node:util'
import checkDate from './dates.js'

const day = '2026-09-10'
const start = `${day}T10:00:00.000Z`
const end = `${day}T11:00:00.000Z`

// Synthetic parser responses keep the assertion contract independent of date parsing.
const cases = [
  ['no extraction', ['text', null], [], true],
  ['null cannot accept an extracted null date', ['text', null], [{ start: null, end: null }], false],
  ['null cannot accept a date', ['text', null], [{ start, end }], false],
  ['missing positive result', ['text', day], [], false],
  ['extra positive result', ['text', day], [{ start }, { start }], false],
  ['date precision', ['text', day], [{ start, end }], true],
  ['time precision', ['text', `${day}T10:00:00`], [{ start }], true],
  ['incorrect time', ['text', `${day}T09:00:00`], [{ start }], false],
  ['offset conversion', ['text', `${day}T10:00:00`], [{ start: `${day}T12:00:00+02:00` }], true],
  ['omitted end', ['text', day], [{ start }], true],
  ['undefined end', ['text', day, undefined], [{ start, end }], true],
  ['null end', ['text', day, null], [{ start, end: null }], true],
  ['null end is not omitted', ['text', day, null], [{ start }], false],
  ['null end is not a date', ['text', day, null], [{ start, end }], false],
  ['supplied end', ['text', day, `${day}T11:00:00`], [{ start, end }], true],
  ['end must not use start', ['text', day, `${day}T10:00:00`], [{ start, end }], false],
  ['missing required end', ['text', day, day], [{ start }], false],
  ['null required start', ['text', day], [{ start: null }], false],
  ['undefined required start', ['text', day], [{}], false],
  ['invalid actual date', ['text', day], [{ start: 'invalid' }], false],
  ['missing expectation', ['text'], [], false],
  ['undefined expectation', ['text', undefined], [], false],
  ['empty expectation', ['text', ''], [], false],
  ['invalid expected date', ['text', '2026-02-30'], [], false],
  ['null with a supplied end', ['text', null, day], [], false],
  ['non-array fixture', null, [], false],
  ['extra fixture fields', ['text', day, day, day], [], false],
]

test('date fixture assertion contract', t => {
  cases.forEach(([name, row, results, expected]) => {
    const assertions = []
    const recorder = {
      deepEqual: (actual, wanted) => assertions.push(isDeepStrictEqual(actual, wanted)),
      fail: () => assertions.push(false),
    }
    const parse = () => ({ dates: () => ({ length: results.length, get: () => results }) })
    checkDate(recorder, parse, {}, row)
    t.deepEqual(assertions, [expected], name)
  })
  const assertions = []
  const recorder = { fail: message => assertions.push(message) }
  checkDate(recorder, () => { throw new Error('parser failed') }, {}, ['text', day])
  t.equal(assertions.length, 1, 'parser exception produces one failure')
  t.ok(assertions[0].includes('parser failed'), 'parser exception remains visible')
  t.end()
})
