import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/clone] '

test('clone root', function (t) {
  const arr = [
    'he eats the alligator',
    'Jumanji is the best move. He eats cheese.',
    'Uperman is wayyyy better than batman!',
  ]
  arr.forEach(function (str) {
    let doc = nlp(str)
    t.equal(doc.out(), str, here + 'equals input - ' + doc.out())

    let up = doc.clone().toUpperCase()
    t.notEqual(str, up.out(), here + 'neg not equal - ' + str)

    let adv = doc.clone().match('#Verb').append('really')
    t.notEqual(str, adv.out(), here + 'adv not equal - ' + str)

    let rm = doc.clone().match('#Verb').delete('#Verb')
    t.notEqual(str, rm.out(), 'rm not equal - ' + str)

    let tag = doc.clone().tag('#Verb')
    t.notEqual(doc.match('#Verb').text(), tag.match('#Verb').text(), here + 'rm not equal - ' + str)
  })
  t.end()
})

test('partial clone basic', function (t) {
  let doc = nlp(`one two three. four five six`).tag('Value')

  // clone/tag first sentence
  let a = doc.eq(0).clone().tag('Person')
  t.equal(a.if('#Person').length, 1, here + 'A has person')
  t.equal(doc.if('#Person').length, 0, here + 'doc has no person')

  t.end()
})

test('partial clone leak', function (t) {
  let doc = nlp(`one two three. four five six`).tag('Value')

  // clone first sentence
  let a = doc.eq(0).clone()
  // tag the whole thing
  a = a.all().tag('Person')
  t.equal(a.if('#Person').length, 2, here + 'A has 2 sentences')
  t.equal(doc.if('#Person').length, 1, here + 'doc has 1 sentence')

  t.end()
})
