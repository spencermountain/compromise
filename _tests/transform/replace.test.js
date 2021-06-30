const test = require('tape')
const nlp = require('../_lib')

test('replace-basic :', function (t) {
  let m = nlp('the dog played').match('dog').replace('cat').all()
  t.equal(m.out('text'), 'the cat played', 'dog-cat')

  m = nlp('the dog played').match('the dog').replace('a cat').all()
  t.equal(m.out('text'), 'a cat played', 'a-cat')

  m = nlp('the dog played').match('#Noun').replace('snake').all()
  t.equal(m.out('text'), 'the snake played', 'snake')

  m = nlp('the pit bull played').match('#Noun+').replace('snake').all()
  t.equal(m.out('text'), 'the snake played', 'pit bull')

  m = nlp('the pit bull dog played').match('#Noun+').replace('grey snake').all()
  t.equal(m.out('text'), 'the grey snake played', 'pit bull dog')

  t.end()
})

test('match-replace :', function (t) {
  ;[
    ['the dog played', 'the dog', 'the cat', 'the cat played'],
    ['the dog played', 'the #Noun', 'the cat', 'the cat played'],
    ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
    ['the boy and the girl', 'the #Noun', 'the house', 'the house and the house'],
    ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
  ].forEach(function (a) {
    const str = nlp(a[0]).replace(a[1], a[2]).out('text')
    const msg = str + ' -- ' + a[3]
    t.equal(str, a[3], msg)
  })

  t.end()
})

test('replace-with-punctuation', function (t) {
  const doc = nlp('Simon, how is Pamela and Jason?')
  const str = doc.match('#Person').replace('PERSON').all().out()
  t.equal(str, 'PERSON, how is PERSON and PERSON?', 'replace-with-punctuation')
  t.end()
})

test('structured-object-replace :', function (t) {
  let r = nlp('fun times in cool town')
  const term = r.match('times')
  r.replace(term, 'day')
  t.equal(r.out(), 'fun day in cool town', 'structured-replace')

  r = nlp('fun times in cool town')
  const terms = r.match('cool town')
  r.replace(terms, 'shitsville')
  t.equal(r.out(), 'fun times in shitsville', 'structured-replace-multi')
  t.end()
})

test('replace-keep some punctuation', function (t) {
  let doc = nlp('two weeks').tag('Cool')
  doc.replace('two', '2', true)
  t.equal(doc.match('#Cool+').text(), '2 weeks', 'replace-keep-tags')

  doc = nlp('first sentence. I am trying it out.')
  doc.match('#Gerund').tag('HashTag')
  doc.match('trying').replaceWith('working', true)
  t.equal(doc.match('#HashTag+').text(), 'working', 'replacewith-keep-tags')
  t.end()
})

test('replace over implict', function (t) {
  let doc = nlp("i'm good")
  doc.match('am').replaceWith('was')
  t.equal(doc.text(), 'i was good', 'replace over implicit')
  t.end()
})

test('replace-with-Doc', function (t) {
  let b = nlp('sneaks').tag('Cool')

  let doc = nlp(`john walks quickly`)

  doc.match('walks').replaceWith(b)
  t.equal(doc.text(), 'john sneaks quickly')
  t.equal(doc.has('#Cool'), true)
  t.end()
})

test('replace-with-function', function (t) {
  const repl = p => {
    if (p.has('john')) {
      return 'johnny'
    }
    return 'nancy'
  }
  let doc = nlp('spencer and John').replace('#Person', repl, true, true)
  t.equal(doc.text(), 'nancy and Johnny', 'replace function')

  doc = nlp('Thurs, Feb 2nd, 2016')
  doc.match('feb').replaceWith(m => {
    return m.text({ trim: true }) + '!'
  })
  t.equal(doc.text(), 'Thurs, Feb! 2nd, 2016', 'replaceWith function')
  t.end()
})

test('replace-tags-param', function (t) {
  let doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging')
  t.equal(doc.has('(jogging && #Gerund)'), true, 'tags not-kept - default')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', true)
  t.equal(doc.has('(jogging && #Person)'), true, 'tags kept - boolean')
  t.equal(doc.has('(jogging && #Gerund)'), false, 'tags kept - boolean')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { keepTags: true })
  t.equal(doc.has('(jogging && #Person)'), true, 'tags kept - boolean')
  t.equal(doc.has('(jogging && #Gerund)'), false, 'tags kept - boolean')

  t.end()
})

test('replace-case-param', function (t) {
  let doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging')
  t.equal(doc.text(), 'Jogging is very cool.', 'case kept - default')

  doc = nlp('spencer is very cool.')
  doc.match('spencer').replaceWith('jogging') // Jogging?
  t.equal(doc.text(), 'jogging is very cool.', 'lowsercase kept - default')

  doc = nlp('Spencer is very cool.')
  doc.match('spencer').replaceWith('jogging', { keepCase: false })
  t.equal(doc.text(), 'jogging is very cool.', 'dont-keep')
  t.end()
})
