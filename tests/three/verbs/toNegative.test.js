import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toNegative] '

test('inline verb negate:', function (t) {
  let arr = [

    [`he is nice`, 'he is not nice'],
    [`she was nice`, 'she was not nice'],

    [`she has walked`, 'she has not walked'],
    [`she had walked`, 'she had not walked'],
    [`we have had problems`, 'we have not had problems'],
    [`we would walk`, 'we would not walk'],
    [`we would have walked`, 'we would not have walked'],

    //conjugations
    [`she walked`, 'she did not walk'],
    [`it all came apart`, 'it did not all come apart'],

    //phrasals
    [`he would come forward`, 'he would not come forward'],
    // [`we come together`, 'do not come together'],
    [`i didn't want to`, "i didn't want to"],

    //===singular
    // pastTense -
    ['john played', 'john did not play'],
    // presentTense -
    ['john plays', 'john does not play'],
    // futureTense -
    ['john will play', 'john will not play'],

    ///===plural
    // pastTense -
    ['we played', 'we did not play'],
    // presentTense -
    ['we play', 'we do not play'],
    // futureTense -
    ['we will play', 'we will not play'],

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

    [`please walk`, `please do not walk`],
    [`he walks`, `he does not walk`],
    [`we walk`, `we do not walk`],
    [`i walk`, `i do not walk`],
    [`spencer walks`, `spencer does not walk`],
    [`he walked`, `he did not walk`],
    [`he will walk`, `he will not walk`],
    [`he is walking`, `he is not walking`],
    [`he was walking`, `he was not walking`],
    [`he will be walking`, `he will not be walking`],
    [`he has walked`, `he has not walked`],
    [`he had walked`, `he had not walked`],
    [`he will have walked`, `he will not have walked`],
    [`he has been walking`, `he has not been walking`],
    [`he had been walking`, `he had not been walking`],
    [`he will have been walking`, `he will not have been walking`],
    [`he got walked`, `he did not get walked`],//**
    [`we were walked`, `we were not walked`],
    [`he had been walked`, `he had not been walked`],
    [`i have been walked`, `i have not been walked`],
    [`he was being walked`, `he was not being walked`],
    [`he is walked`, `he is not walked`],
    [`he has been walked`, `he has not been walked`],
    [`we are walked`, `we are not walked`],
    [`he will have been walked`, `he will not have been walked`],
    [`we will be walked`, `we will not be walked`],
    [`he would be walked`, `he would not be walked`],
    [`he would have been walked`, `he would not have been walked`],
    [`he is going to walk`, `he is not going to walk`],
    [`he did walk`, `he did not walk`],
    [`he used to walk`, `he did not used to walk`],
    [`we do walk`, `we do not walk`],
    [`he does walk`, `he does not walk`],
    [`he could have walked`, `he could not have walked`],
    [`he wants to walk`, `he does not want to walk`],
    [`he can walk`, `he can not walk`],

    // already-negative
    [`he can not walk`, `he can not walk`],
    [`he could not have really walked`, `he could not have really walked`],
    ['there is not hope', 'there is not hope'],
    ['there is no hope', 'there is no hope'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    doc.verbs().toNegative()
    let str = doc.text('normal')
    t.equal(str, a[1], here + a[1] + ' --- ' + str)
  })
  t.end()
})
