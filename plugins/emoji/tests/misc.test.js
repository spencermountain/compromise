const test = require('tape')
const nlp = require('./_lib')

test('misc methods', function(t) {
  const text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3'

  //has method
  const m = nlp(text)
  t.equal(m.match('#Emoji').found, true, 'nlp.has positive')
  t.equal(m.match('#SportsTeam').found, false, 'nlp.has neg')

  //filter string
  let small = m.if('#Emoji')
  t.equal(small.text(), 'this :cookie: <3 💯 so good. Yes it is <3', 'nlp.filter string')

  //filter method
  small = m.ifNo('#Emoji')
  t.equal(small.text(), 'It is really nice.', 'nlp.filter method')

  t.end()
})
