const test = require('tape')
const nlp = require('./_lib')

test('keyword emojis', function (t) {
  ;[
    ['he is so nice :heart:', ':heart:'],
    [':cool: :wine_glass: yeah party', ':cool: :wine_glass:'],
    ['to be or not to be: this is a question :cookie:', ':cookie:'],
  ].forEach(function (a) {
    const have = nlp(a[0]).match('#Emoji').text().trim()
    const msg = "have: '" + have + "'  want: '" + a[1] + "'"
    t.equal(have, a[1], msg)
  })
  t.end()
})

test('unicode emojis', function (t) {
  ;[
    ['nice job 💯 ❤️', '💯 ❤️'],
    ['💚 good job 🎇', '💚 🎇'],
    ['visit Brunei', ''],
    ['visit Brunei 🇧🇳', '🇧🇳'],
    ['visit Brunei 🇧🇳🇧🇳🇧🇳', '🇧🇳🇧🇳🇧🇳'],
  ].forEach(function (a) {
    const have = nlp(a[0]).match('#Emoji').out('normal')
    const msg = "have: '" + have + "'  want: '" + a[1] + "'"
    t.equal(have, a[1], msg)
  })
  t.end()
})

test('emoticon emojis', function (t) {
  ;[
    ['nice job :)', ':)'],
    [';) good work', ';)'],
    [';( oh no :(', ';( :('],
    ['to be: that is th3 question', ''],
    ['</3 </3 </3 sad', '</3 </3 </3'],
    // ['</3</3', '</3</3'],
  ].forEach(function (a) {
    const have = nlp(a[0]).match('#Emoticon').out('normal')
    const msg = "have: '" + have + "'  want: '" + a[1] + "'"
    t.equal(have, a[1], msg)
  })
  t.end()
})

test('result methods', function (t) {
  const text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3'

  //has method
  const m = nlp(text)
  t.equal(m.match('#Emoji').found, true, 'nlp.has positive')
  t.equal(m.match('#SportsTeam').found, false, 'nlp.has neg')

  //filter string
  let small = m.if('(#Emoji|#Emoticon)')
  t.equal(small.out('text'), 'this :cookie: <3 💯 so good. Yes it is <3', 'nlp.filter string')

  //filter method
  small = m.ifNo('(#Emoji|#Emoticon)')
  t.equal(small.out('normal'), 'it is really nice.', 'nlp.filter method')

  t.end()
})
