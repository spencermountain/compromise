import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/misc/emoji] '

test('unicode emojis', function (t) {
  [
    ['nice job 💯 ❤️', '💯 ❤️'],
    ['💚 good job 🎇', '💚 🎇'],
    ['visit Brunei', ''],
    ['visit Brunei 🇧🇳', '🇧🇳'],
    ['visit Brunei 🇧🇳🇧🇳🇧🇳', '🇧🇳🇧🇳🇧🇳'],
  ].forEach(function (a) {
    const have = nlp(a[0]).match('#Emoji').out('normal')
    const msg = "have: '" + have + "'  want: '" + a[1] + "'"
    t.equal(have, a[1], here + msg)
  })
  t.end()
})

test('emoticon emojis', function (t) {
  [
    ['nice job :)', ':)'],
    [';) good work', ';)'],
    [';( oh no :(', ';( :('],
    ['to be: that is th3 question', ''],
    ['</3 </3 </3 sad', '</3 </3 </3'],
    // ['</3</3', '</3</3'],
  ].forEach(function (a) {
    const have = nlp(a[0]).match('#Emoticon').out('normal')
    t.equal(have, a[1], here + a[0])
  })
  t.end()
})

test('result methods', function (t) {
  const text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3'

  //has method
  const m = nlp(text)
  t.equal(m.match('#Emoji').found, true, here + 'nlp.has positive')
  t.equal(m.match('#SportsTeam').found, false, here + 'nlp.has neg')

  //filter string
  let small = m.if('(#Emoji|#Emoticon)')
  t.equal(small.out('text'), 'this :cookie: <3 💯 so good. Yes it is <3', here + 'nlp.filter string')

  //filter method
  small = m.ifNo('(#Emoji|#Emoticon)')
  t.equal(small.out('normal'), 'it is really nice.', here + 'nlp.filter method')

  t.end()
})
