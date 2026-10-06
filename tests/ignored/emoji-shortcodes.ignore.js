import test from 'tape'
import nlp from '../two/_lib.js'
const here = '[ignored/emoji-shortcodes] '

// Deferred: Emoji tagging does not currently recognize colon-delimited shortcodes.
test(here + 'keyword emojis', function (t) {
  [
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
