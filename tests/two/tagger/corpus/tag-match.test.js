import test from 'tape'
import nlp from '../../_lib.js'
import cases from './tag-match-cases.js'
const here = '[two/tagger/corpus/tag-match] '

test(here + 'two/tagger/corpus: tag patterns match the complete input', t => {
  cases.forEach(([input, pattern]) => {
    const doc = nlp(input).compute('tagRank')
    const tags = doc.json()[0].terms.map(term => term.tagRank[0])
    t.equal(doc.match(pattern).text(), doc.text(), `${input}: ${pattern} (${tags.join(', ')})`)
  })
  t.end()
})
