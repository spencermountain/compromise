import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/topics/acronyms] '

test(here + 'topics include acronyms without overlapping entities', t => {
  const doc = nlp('NASA works with EACD and IBM. John H. Smith met EACD representatives.')
  t.deepEqual(doc.topics().out('array').sort(), ['NASA', 'EACD', 'IBM.', 'John H. Smith', 'EACD'].sort())
  t.equal(doc.topics().out('freq').find(o => o.normal === 'eacd').count, 2, 'keep repeated occurrences')
  t.deepEqual(nlp('the John & Mary Ltd').topics().out('array'), ['John & Mary Ltd'], 'omit acronym suffix within organization')
  t.deepEqual(nlp('NASA EACD').topics().out('array').sort(), ['EACD', 'NASA'], 'retain adjacent unrecognized acronyms')
  t.equal(nlp('the DNA').has('#Organization'), false, 'acronyms do not need an organization tag')
  t.deepEqual(nlp('the DNA').topics().out('array'), ['DNA'])
  t.end()
})

test(here + 'name pairs are proper nouns with stronger organization cues retained', t => {
  const pairs = ['John & John', 'John & Mary', 'Smith & Rogers', 'John & Mary Ltd']
  pairs.forEach(text => {
    const doc = nlp(text)
    t.ok(doc.has('^#ProperNoun+$'), text)
    t.equal(doc.match('&').has('#Acronym'), false, 'ampersand is not an initial')
  })
  t.ok(nlp('Smith & Rogers').has('^#Organization+$'), 'surname business')
  t.ok(nlp('John & Mary Ltd').has('^#Organization+$'), 'company suffix')
  t.equal(nlp('salt & pepper').has('#ProperNoun'), false, 'ordinary nouns')
  t.end()
})
