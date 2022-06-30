import test from 'tape'
import nlp from './_lib.js'
import plg from '../src/plugin.js'
import corpus from 'nlp-corpus'
const here = '[lazy] '
nlp.plugin(plg)


test('lazy matches are correct', function (t) {
  let txt = corpus.some(2000).join('\n')
  let arr = [
    'captain .',
    '. of the #Noun',
    '#Adverb #Adverb+',
    '#Url #Noun .?',
    'certain !#Plural'
  ]
  arr.forEach(str => {
    // let begin = new Date()
    let reg = nlp(txt).match(str)
    // console.log((new Date().getTime() - begin.getTime()) / 1000)
    // begin = new Date()
    let lazy = nlp.lazy(txt, str)
    // console.log('->', (new Date().getTime() - begin.getTime()) / 1000)

    t.equal(reg.length, lazy.length, here + ' ' + str)
    // t.deepEqual(reg.out('array'), lazy.out('array'), here + ' ' + str)
  })
  t.end()
})