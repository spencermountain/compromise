const test = require('tape')
const nlp = require('./_lib')

// do an elaborate comparison between json objects
const isEqual = function(a, b, t) {
  let jsonA = a.json()
  let jsonB = b.json()
  t.equal(a.length, b.length, 'same length')
  t.equal(a.text(), b.text(), 'same text')
  jsonA.forEach((o, i) => {
    t.equal(o.text, jsonB[i].text, o.text)
    t.equal(o.terms.length, jsonB[i].terms.length, 'terms-length ' + i)
    o.terms.forEach(term => {
      term.tags.forEach(tag => {
        let p = b.eq(i)
        t.equal(p.has('#' + tag), true, p.text() + ' has ' + tag)
      })
    })
  })
}

test('load export() basic', function(t) {
  let a = nlp('it was cold. John K. Smith  was  verrrrry  cold ! ')
  let b = nlp.load(a.export())
  isEqual(a, b, t)
  t.end()
})

test('load export() empty', function(t) {
  let a = nlp('')
  let b = nlp.load(a.export())
  isEqual(a, b, t)

  t.end()
})

test('load export() -garbage', function(t) {
  let a = nlp('[]. oh yeah. function the null prototype.   - \n "two| (time()7 77')
  let b = nlp.load(a.export())
  isEqual(a, b, t)

  t.end()
})

test('export() unknown tag', function(t) {
  let a = nlp('cookie monster was a boomer. ok boomer', { boomer: 'Generation' })
  a.match('. monster').tag('Character')
  a.match('ok boomer').tag('Diss')
  let json = a.export()
  let b = nlp.load(json)
  isEqual(a, b, t)
  t.end()
})

// test('load export() contraction', function(t) {
//   let a = nlp('I’ve had one dream.')
//   let b = nlp.load(a.export())
//   isEqual(a, b, t)
//   t.end()
// })

// test('load json() contraction', function(t) {
//   let a = nlp('I’ve had one dream.')
//   let b = nlp.load(a.json())
//   isEqual(a, b, t)
//   t.end()
// })

// test('load-json output - basic', function(t) {
//   let a = nlp('All my life I’ve had one dream - to accomplish my many goals.')
//   let b = nlp.load(a.json())
//   isEqual(a, b, t)
//   t.end()
// })
// test('load-json output - longer', function(t) {
//   let str = `OK... First I'll access the secret military spy satelite that is in geosynchronous orbit over the midwest. Then I'll ID the limo by the vanity plate "MR. BIGGG" and get his approximate position. Then I'll reposition the transmission dish on the remote truck to 17.32 degrees east, hit WESTAR 4 over the Atlantic, bounce the signal back into the aerosphere up to COMSAT 6, beam it back to SATCOM 2 transmitter number 137 and down on the dish on the back of Mr. Big's limo... It's almost too easy.`
//   let a = nlp(str)
//   let b = nlp.load(a.json())
//   isEqual(a, b, t)
//   t.end()
// })
