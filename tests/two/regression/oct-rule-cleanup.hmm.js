import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match-spec] '

const spec = `

  On Friday, food and drinks are free. {Prep,Date,Noun,Conj,Noun,Vb,Adj}
  On Friday, food or drinks will be provided. {Prep,Date,Noun,Conj,Noun,Vb,Vb,Vb}
  On Tuesday, gifts and thanks arrived. {Prep,Date,Noun,Conj,Noun,Past}
  We discussed London, Paris and travel. {Noun,Past,Noun,Noun,Conj,Noun}

`

test('match spec:', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const aliases = {}
  Object.entries(tagSet).forEach(([tag, info]) => {
    if (info.alias) aliases[info.alias] = tag
  })
  spec
    .split('\n')
    .filter(line => line.trim() && !line.trimStart().startsWith('#'))
    .forEach(line => {
      const failing = nlp.testSpec(line, false)
      const brace = line.lastIndexOf('{')
      const sentence = line.slice(0, brace).trim()
      const differences = []
      if (failing.found) {
        failing.compute('tagRank')
        const slots = line
          .slice(brace + 1)
          .replace(/\}[ \t]*#.*$/, '}')
          .replace(/\}$/, '')
          .split(',')
        const terms = failing.docs.flat()
        slots.forEach((slot, i) => {
          const expected = slot.split('|').map(tag => tag.trim())
          const term = terms[i]
          if (!term) {
            differences.push(`term ${i + 1}: missing, expected ${slot}`)
          } else if (!expected.every(tag => term.tags.has(aliases[tag] || tag))) {
            const word = term.implicit || term.text
            const actual = term.tagRank[0] || 'Untagged'
            const missing = expected.find(tag => !term.tags.has(aliases[tag] || tag))
            differences.push(`'${word}' #${actual}!=#${missing}`)
          }
        })
        if (terms.length !== slots.length) {
          differences.push(`expected ${slots.length} terms, got ${terms.length}`)
        }
        if (differences.length === 0) differences.push('tags align, but the sentence pattern did not match')
      }
      const detail = differences.length > 0 ? ' — ' + differences.join('; ') : ''
      t.equal(failing.found, false, here + sentence + detail)
    })
  t.end()
})
