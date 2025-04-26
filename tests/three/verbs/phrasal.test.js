import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/phrasal]'

test('phrasal-verbs:', function (t) {
  const arr = [
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will', 'mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ]
  arr.forEach(function (a) {
    const terms = nlp(a[0]).out('array')
    const msg = terms.join(' ') + '  -- ' + a[1].join(' ')
    t.equal(terms.join(' '), a[1].join(' '), here + msg)
  })
  t.end()
})
