const test = require('tape')
const nlp = require('../_lib')

test('phrasal-verbs:', function (t) {
  ;[
    [`he is really good`, ['he', 'is', 'really', 'good']],
    [`he is upset about it`, ['he', 'is', 'upset', 'about', 'it']],
    [`he will mess about with it`, ['he', 'will', 'mess about', 'with', 'it']],

    [`come forward`, ['come forward']],
    [`come together`, ['come together']],
    [`come apart`, ['come apart']],

    [`frighten back`, ['frighten', 'back']],
    [`frighten away`, ['frighten away']],
  ].forEach(function (a) {
    const terms = nlp(a[0]).out('array')
    const msg = terms.join(' ') + '  -- ' + a[1].join(' ')
    t.equal(terms.join(' '), a[1].join(' '), msg)
  })
  t.end()
})
