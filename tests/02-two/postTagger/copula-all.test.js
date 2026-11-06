import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/copula-all] '

test('all, after a copula', function (t) {
  const nouns = ['that is all', 'this was all', 'it is all', 'that is all i have', 'it is really all']
  nouns.forEach(str => {
    t.ok(nlp(str).has('(all && #Noun)'), here + `noun: '${str}'`)
  })
  const adverbs = [
    'it is all right',
    'it was all experimental',
    'we are all drunk',
    'it is all over',
    'it is not all bad',
    'it was all planned out',
  ]
  adverbs.forEach(str => {
    const all = nlp(str).match('all')
    t.ok(all.has('#Adverb'), here + `adverb: '${str}'`)
    t.notOk(all.has('#Noun'), here + `not a noun: '${str}'`)
  })
  t.end()
})
