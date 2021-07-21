const test = require('tape')
const nlp = require('./_lib')
const isEqual = require('./_isEqual')

test('load export() basic', function(t) {
  let a = nlp('it was cold. John K. Smith  was  verrrrry  cold ! ')
  let b = nlp.import(a.export())
  isEqual(a, b, t)
  t.end()
})

test('load export() empty', function(t) {
  let a = nlp('')
  let b = nlp.import(a.export())
  isEqual(a, b, t)

  t.end()
})

test('load export() -garbage', function(t) {
  let a = nlp('[]. oh yeah. function the null prototype.   - \n "two| (time()7 77')
  let b = nlp.import(a.export())
  isEqual(a, b, t)

  t.end()
})

test('export() unknown tag', function(t) {
  let a = nlp('cookie monster was a boomer. ok boomer', { boomer: 'Generation' })
  a.match('. monster').tag('Character')
  a.match('ok boomer').tag('Diss')
  let data = a.export()
  let b = nlp.import(data)
  isEqual(a, b, t)
  t.end()
})

test('load export() contraction', function(t) {
  let a = nlp('I’ve had one dream.')
  let b = nlp.import(a.export())
  isEqual(a, b, t)
  t.end()
})
