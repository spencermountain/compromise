import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/lazy] '
import penn from '../tagger/_pennSample.js'
let txt = penn.map(a => a.text).join('\n')

test('lazy matches are equal', function (t) {
  let arr = [
    'captain .',
    '. of the #Noun',
    '#Adverb #Adverb+',
    '#Url #Noun .?',
    'certain !#Plural'
  ]
  arr.forEach(str => {
    let reg = nlp(txt).match(str)
    let lazy = nlp.lazy(txt, str)
    t.equal(reg.length, lazy.length, here + ' ' + str)
    t.deepEqual(reg.out('array'), lazy.out('array'), here + ' ' + str)
  })
  t.end()
})