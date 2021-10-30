import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toInfinitive] '

test('toInfinitive:', function (t) {
  let arr = [
    // known forms:
    ['he walked', 'he walk'],
    ['i walked', 'i walk'],
    ['we walked', 'we walk'],
    ['they walked', 'they walk'],
    ['the friends walked', 'the friends walk'],
    ['the friend walked', 'the friend walk'],
    ['our users walked', 'our users walk'],
    ['our user walked', 'our user walk'],
    ['the eye closed', 'the eye close'],
    ['the eyes closed', 'the eyes close'],

    ['their colloseum will open', 'their colloseum open'],
    ['their children will open', 'their children open'],

    ['he walks', 'he walk'],
    ['he walked', 'he walk'],
    ['he will walk', 'he walk'],
    ['he is walking', 'he walk'],
    ['he was walking', 'he walk'],
    ['i am walking', 'i walk'],
    ['he will be walking', 'he walk'],

    ['he has walked', 'he walk'],
    ['he had walked', 'he walk'],
    ['he will have walked', 'he walk'],
    ['he has been walking', 'he walk'],
    ['he had been walking', 'he walk'],
    ['he will have been walking', 'he walk'],
    ['got walked', 'walk'],
    ['was walked', 'walk'],
    ['were walked', 'walk'],
    ['i was being walked', 'i walk'],
    ['had been walked', 'walk'],
    ['have been walked', 'walk'],
    ['is walked', 'walk'],
    ['are walked', 'walk'],
    ['is being walked', 'walk'],
    ['she has been walked', 'she walk'],
    ['had been walked', 'walk'],
    ['will have been walked', 'walk'],
    ['will be walked', 'walk'],
    ['would be walked', 'walk'],
    ['would have been walked', 'walk'],
    ['is going to walk', 'walk'],
    ['did walk', 'walk'],
    ['used to walk', 'walk'],
    ['do walk', 'walk'],
    ['does walk', 'walk'],
    // adverbs
    ['i was really not being walked', 'i really not walk'],
    ['i was not really being walked', 'i not really walk'],
    ['i was being really not walked', 'i really not walk'],
    ['i was being not really walked', 'i not really walk'],
    ['he was not going to walk', 'he not walk'],
    ['we are putting', 'we put'],


    // want-infinitive
    // ['he wants to walk', 'he want to walk'],
    // ['he wanted to walk', 'he want to walk'],
    // ['he will want to walk', 'he want to walk'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toInfinitive()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
