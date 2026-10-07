import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/api/lazy-constructor] '
import penn from '../../lib/penn-sample.js'
const txt = penn.map(a => a.text).join('\n')

test('lazy matches are equal', function (t) {
  const arr = [
    'captain .',
    '. of the #Noun',
    '#Adverb #Adverb+',
    '#Url #Noun .?',
    'certain !#Plural'
  ]
  arr.forEach(str => {
    const reg = nlp(txt).match(str)
    const lazy = nlp.lazy(txt, str)
    t.equal(reg.length, lazy.length, here + ' ' + str)
    t.deepEqual(reg.out('array'), lazy.out('array'), here + ' ' + str)
  })
  t.end()
})