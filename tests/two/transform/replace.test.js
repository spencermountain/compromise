import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/replace] '

test('replace-basic :', function (t) {
  let m = nlp('the dog played').match('dog').replace('cat').all()
  t.equal(m.out('text'), 'the cat played', here + 'dog-cat')

  m = nlp('the dog played').match('the dog').replace('a cat').all()
  t.equal(m.out('text'), 'a cat played', here + 'a-cat')

  m = nlp('the dog played').match('#Noun').replace('snake').all()
  t.equal(m.out('text'), 'the snake played', here + 'snake')

  m = nlp('the pit bull played').match('#Noun+').replace('snake').all()
  t.equal(m.out('text'), 'the snake played', here + 'pit bull')

  m = nlp('the pit bull dog played').match('#Noun+').replace('grey snake').all()
  t.equal(m.out('text'), 'the grey snake played', here + 'pit bull dog')

  t.end()
})



test('match-replace :', function (t) {
  let arr = [
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the #Noun', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the #Noun', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
    ['the boy and the girl', '(boy|girl)', 'cat', 'the cat and the cat'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).replace(a[1], a[2]).all().out('text')
    const msg = str + ' -- ' + a[3]
    t.equal(str, a[3], here + msg)
  })
  t.end()
})

test('replace-with-punctuation', function (t) {
  const doc = nlp('Simon, how is Pamela and Jason?')
  const str = doc.match('#Person').replace('PERSON').all().out()
  t.equal(str, 'PERSON, how is PERSON and PERSON?', here + 'replace-with-punctuation')
  t.end()
})

test('structured-object-replace :', function (t) {
  let r = nlp('fun times in cool town')
  const term = r.match('times')
  r.replace(term, 'day')
  t.equal(r.out(), 'fun day in cool town', here + 'structured-replace')

  r = nlp('fun times in cool town')
  const terms = r.match('cool town')
  r.replace(terms, 'shitsville')
  t.equal(r.out(), 'fun times in shitsville', here + 'structured-replace-multi')
  t.end()
})

test('replace-keep some punctuation', function (t) {
  let doc = nlp('two weeks').tag('Cool')
  doc.replace('two', '2', { tags: true })
  t.equal(doc.match('#Cool+').text(), '2 weeks', here + 'replace-keep-tags')

  doc = nlp('first sentence. I am trying it out.')
  let m = doc.match('trying').tag('HashTag')
  m.replaceWith('working', { tags: true })
  t.equal(doc.match('#HashTag+').text(), 'working', here + 'replacewith-keep-tags')
  t.end()
})

test('replace over implict', function (t) {
  let doc = nlp("i'm good")
  doc.match('am').replaceWith('was')
  t.equal(doc.text(), 'i was good', here + 'replace over implicit')
  t.end()
})

test('replace-with-Doc', function (t) {
  let b = nlp('sneaks').tag('Cool')
  let doc = nlp(`john walks quickly`)
  doc.match('walks').replaceWith(b, { tags: true })
  t.equal(doc.text(), 'john sneaks quickly', here + 'doc-replace')
  t.equal(doc.has('#Cool'), true, here + 'doc-replace tags')
  t.end()
})

test('replace-with-function', function (t) {
  const fn = p => {
    if (p.has('john')) {
      return 'johnny'
    }
    return 'nancy'
  }
  let doc = nlp('spencer and John')
  doc.replace('#Person', fn)
  t.equal(doc.text(), 'nancy and johnny', here + 'replace function')

  doc = nlp('Thurs, Feb 2nd, 2016')
  doc.match('feb').replaceWith(m => {
    return m.text({ trim: true }) + '!'
  })
  t.equal(doc.text(), 'Thurs, Feb! 2nd, 2016', here + 'replaceWith function')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith((m) => m.text() + 's')
  doc.match('is').replaceWith(() => 'are')
  t.equal(doc.text(), 'Spencers are very cool.', here + 'replaceWith twice')
  t.end()
})

test('replace-tags-param', function (t) {
  let doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging')
  let m = doc.match('jogging')
  t.equal(m.has('#Person'), false, here + 'tags not-kept - default')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { tags: true })
  t.equal(doc.has('(jogging && #Person)'), true, here + 'tags kept - boolean')
  t.equal(doc.has('(jogging && #Gerund)'), false, here + 'tags kept - boolean')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { tags: true })
  t.equal(doc.has('(jogging && #Person)'), true, here + 'tags kept - boolean')
  t.equal(doc.has('(jogging && #Gerund)'), false, 'here+tags kept - boolean')

  t.end()
})

test('replace-case-param', function (t) {
  let doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { case: true })
  t.equal(doc.text(), 'Jogging is very cool.', here + here + 'case kept ')

  doc = nlp('spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { case: false }) // Jogging?
  t.equal(doc.text(), 'jogging is very cool.', here + here + 'lowsercase kept - default')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { case: false })
  t.equal(doc.text(), 'jogging is very cool.', 'dont-keep')
  t.end()
})


test('replace-repair', function (t) {
  let doc = nlp('the cat and the dog')
  doc.replace('#Noun', 'house')
  t.equal(doc.text(), 'the house and the house', here + 'repair-one-one')


  doc = nlp('the cat and the dog')
  doc.replace('the #Noun', 'the house')
  t.equal(doc.text(), 'the house and the house', here + 'repair-two-two')

  doc = nlp('the cat and the dog')
  doc.replace('#Noun', 'cool house')
  t.equal(doc.text(), 'the cool house and the cool house', here + 'repair-one-two')

  doc = nlp('the cat and the dog')
  doc.replace('the #Noun', 'house')
  t.equal(doc.text(), 'house and house', here + 'repair-two-one')
  t.end()
})

