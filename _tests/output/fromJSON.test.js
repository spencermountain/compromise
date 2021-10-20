const test = require('tape')
const nlp = require('../_lib')

// do an elaborate comparison between json objects
const isEqual = function (a, b, t) {
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

test('fromJSON - minimum', function (t) {
  let json = [
    {
      terms: [
        { text: 'hi', tags: ['Foo'] },
        { text: 'world', tags: ['Bar'] },
      ],
    },
    {
      terms: [
        { text: 'hi', tags: ['Foo'] },
        { text: 'there', tags: ['Bar'] },
      ],
    },
  ]
  let doc = nlp.fromJSON(json)
  t.equal(doc.text(), 'hi world. hi there.', 'two words')
  t.equal(doc.has('#Bar'), true, 'has tag')
  t.end()
})

test('fromJSON - basic', function (t) {
  let a = nlp('All my life I’ve had one dream - to accomplish my many goals.')
  let b = nlp.fromJSON(a.json())
  isEqual(a, b, t)
  t.end()
})

test('fromJSON() contraction', function (t) {
  let a = nlp('I’ve had one dream.')
  let b = nlp.fromJSON(a.json())
  isEqual(a, b, t)
  t.end()
})

test('fromJSON output - longer', function (t) {
  let str = `OK... First I'll access the secret military spy satelite that is in geosynchronous orbit over the midwest. Then I'll ID the limo by the vanity plate "MR. BIGGG" and get his approximate position. Then I'll reposition the transmission dish on the remote truck to 17.32 degrees east, hit WESTAR 4 over the Atlantic, bounce the signal back into the aerosphere up to COMSAT 6, beam it back to SATCOM 2 transmitter number 137 and down on the dish on the back of Mr. Big's limo... It's almost too easy.`
  let a = nlp(str)
  let b = nlp.fromJSON(a.json())
  isEqual(a, b, t)
  t.end()
})
