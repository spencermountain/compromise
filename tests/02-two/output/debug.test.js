/* eslint-disable no-console */
import test from 'tape'
import nlp from '../lib.js'
const here = '[one/output/debug] '

// run fn, collecting the arguments of each console.log call
const capture = fn => {
  const logs = []
  const original = console.log
  console.log = (...args) => logs.push(args)
  try {
    fn()
  } finally {
    console.log = original
  }
  return logs
}

test('debug prints every tag color', function (t) {
  // one word for each color in the tagset
  const doc = nlp('the quick dog quickly ate four big apples in June')
  const out = capture(() => doc.debug())
    .join('\n')
    .replace(/\x1b\[\d+m/g, '') // eslint-disable-line no-control-regex
  doc.terms().forEach(term => {
    t.ok(out.includes(`'${term.text('trim')}'`), here + term.text())
  })
  // a color we have no function for
  const world = nlp.world()
  const tag = world.model.one.tagSet.Noun
  const color = tag.color
  tag.color = 'chartreuse'
  t.doesNotThrow(() => capture(() => nlp('dog').debug()), here + 'unknown color')
  tag.color = color
  t.end()
})
