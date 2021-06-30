const test = require('tape')
const nlp = require('../_lib')

test('negative-verb-phrase:', function (t) {
  let arr = [
    [`he is nice`, 'is not'],
    [`she was nice`, 'was not'],

    [`she has walked`, 'has not walked'],
    [`she had walked`, 'had not walked'],
    [`we have had problems`, 'have not had'],
    [`we would walk`, 'would not walk'],
    [`we would have walked`, 'would not have walked'],

    //conjugations
    [`she walked`, 'did not walk'],
    [`it all came apart`, 'did not come apart'],

    //phrasals
    [`he would come forward`, 'would not come forward'],
    // [`we come together`, 'do not come together'],
    [`i didn't want to`, "didn't want"],

    //===singular
    // pastTense -
    ['john played', 'did not play'],
    // presentTense -
    ['john plays', 'does not play'],
    // futureTense -
    ['john will play', 'will not play'],

    ///===plural
    // pastTense -
    ['we played', 'did not play'],
    // presentTense -
    ['we play', 'do not play'],
    // futureTense -
    ['we will play', 'will not play'],
  ]
  arr.forEach(function (a) {
    const vb = nlp(a[0]).verbs().toNegative()
    const str = vb.out('text')
    t.equal(str, a[1], "'" + str + "' - - want: " + a[1])
  })
  t.end()
})

test('inline verb negate:', function (t) {
  let arr = [
    ['is', 'is not'],
    ['will', 'will not'],
    ['will be', 'will not be'],
    ['was', 'was not'],

    ['walks', 'does not walk'],
    ['walked', 'did not walk'],
    // ['walking', 'not walking'],
    // ['walk', 'do not walk'],
    ['will walk', 'will not walk'],
    ['will have walked', 'will not have walked'],
    //auxiliary/adjective
    ['he was lifted', 'he was not lifted'],
    ['he was lifting', 'he was not lifting'],
    ['he was tall', 'he was not tall'],
    ['he was armed', 'he was not armed'],
    [`he was frightened`, 'he was not frightened'],
    [`he was frightened of`, 'he was not frightened of'],
    // [`he was frightened-of`, 'he was not frightened-of'],

    //already negative
    ['he did not die', 'he did not die'],
    ['that is not it', 'that is not it'],
    ['we will not have this', 'we will not have this'],
    ['we would not particularly go', 'we would not particularly go'],

    // ['corrupted', 'did not corrupt'],
    ['jumped', 'did not jump'],
    ['stunk up', 'did not stink up'],

    [`would study`, `would not study`],
    [`could study`, `could not study`],
    [`should study`, `should not study`],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.verbs().toNegative()
    let str = doc.text('normal')
    t.equal(str, a[1], a[1] + ' --- ' + str)
  })
  t.end()
})
