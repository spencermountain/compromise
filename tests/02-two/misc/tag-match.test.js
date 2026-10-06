import test from 'tape'
import nlp from '../_lib.js'
import cases from './tag-match-cases.js'
const here = '[two/misc/tag-match] '

test(here + 'tag patterns match the complete input', t => {
  cases.forEach(([input, pattern]) => {
    const doc = nlp(input).compute('tagRank')
    const tags = doc.json()[0].terms.map(term => term.tagRank[0])
    t.equal(doc.match(pattern).text(), doc.text(), `${input}: ${pattern} (${tags.join(', ')})`)
  })
  t.end()
})
