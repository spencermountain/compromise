import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/integration/match/capture-boundaries] '

test(here + 'fixed-length matches preserve captures and fallbacks', t => {
  t.deepEqual(nlp('the red fox and the red fox').match('the [red fox]', 0).out('array'), ['red fox', 'red fox'], 'capture offsets at multiple starts')
  t.equal(nlp('the red fox').match('^the [red fox]$', 0).text(), 'red fox', 'anchored capture')
  t.equal(nlp('the red fox').match('the red fox jumps').found, false, 'short input')
  t.equal(nlp("we've arrived").match("we've arrived").text(), "we've arrived", 'contraction consumes its implicit terms')
  t.equal(nlp('the red fox').match('the very? red fox').text(), 'the red fox', 'optional term fallback')
  t.equal(nlp('red red fox').match('red+ fox').text(), 'red red fox', 'repetition fallback')
  t.end()
})

test(here + 'matcher cleanup preserves occurrence order and boundaries', t => {
  const doc = nlp('red blue red blue')
  t.deepEqual(doc.match('red blue').out('array'), ['red blue', 'red blue'], 'repeated matches')
  t.deepEqual(doc.match('^red blue').out('array'), ['red blue'], 'first occurrence')
  t.deepEqual(doc.match('red blue$').out('array'), ['red blue'], 'last occurrence')
  t.deepEqual(doc.match('!blue blue').out('array'), ['red blue', 'red blue'], 'negative first term')
  t.deepEqual(nlp('red red red').match('red red').out('array'), ['red red'], 'nonoverlapping matches')
  t.deepEqual(nlp('red blue. red blue.').match('^red blue$').out('array'), ['red blue.', 'red blue.'], 'sentence boundaries')
  t.end()
})
