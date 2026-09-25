/* eslint-disable no-console */
import test from 'tape'
import nlp from '../_lib.js'

const here = '[two/contradictions] '
const compile = nlp.world().methods.one.addTags

const captureWarnings = function (fn) {
  const original = console.warn
  const warnings = []
  console.warn = message => warnings.push(message)
  try {
    return { result: fn(), warnings }
  } finally {
    console.warn = original
  }
}

test('contradictions: warn without rejecting definitions', function (t) {
  const cases = [
    { Self: { not: 'Self' } },
    { Parent: {}, Child: { is: 'Parent', not: 'Parent' } },
    { Noun: { not: 'Verb' }, Verb: {}, Both: { is: 'Noun', also: ['Verb'] } },
  ]
  const expected = [
    { tag: 'Self', conflict: 'Self' },
    { tag: 'Child', conflict: 'Parent' },
    { tag: 'Both', conflict: 'Verb' },
  ]
  cases.forEach((definitions, i) => {
    const { result, warnings } = captureWarnings(() => compile(definitions, {}))
    const { tag, conflict } = expected[i]
    t.ok(result[tag], here + tag + ' still compiles')
    t.ok(result[tag].not.includes(conflict), here + tag + ' retains its exclusions')
    t.equal(warnings.length, 1, here + tag + ' warns once')
    t.ok(warnings[0].includes(`contradictory tag '#${tag}'`), here + 'warning identifies the tag')
    t.ok(warnings[0].includes(`#${conflict}`), here + 'warning identifies the conflict')
  })
  t.end()
})

test('contradictions: inherited conflicts across registration batches', function (t) {
  const existing = compile({ Left: { not: 'Right' }, Right: {}, Via: { also: ['Right'] } }, {})
  const { result, warnings } = captureWarnings(() => compile({
    Both: { is: 'Left', also: ['Via'] },
    Descendant: { is: 'Both' },
  }, existing))
  t.ok(result.Descendant.parents.includes('Right'), here + 'transitive also parent retained')
  for (const tag of ['Both', 'Descendant']) {
    const matches = warnings.filter(message => message.includes(`contradictory tag '#${tag}'`))
    t.equal(matches.length, 1, here + tag + ' warns once')
    t.ok(matches[0].includes('#Left') && matches[0].includes('#Right'), here + tag + ' reports incompatible ancestors')
  }
  t.equal(warnings.length, 2, here + 'valid ancestors do not warn')
  t.end()
})

test('contradictions: valid definitions remain quiet', function (t) {
  const { warnings } = captureWarnings(() => {
    compile({}, nlp.world().model.one.tagSet)
    compile({ Left: {}, Right: {}, Both: { is: 'Left', also: ['Right'] }, Other: { not: 'Both' } }, {})
  })
  t.deepEqual(warnings, [], here + 'built-in tags and compatible multiple parents do not warn')
  t.end()
})
