import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPresent] '

test('toPresent:', function (t) {
  let arr = [
    // known forms:
    ['he walked', 'he walks'],
    ['i walked', 'i walk'],
    ['we walked', 'we walk'],
    ['they walked', 'they walk'],
    ['the friends walked', 'the friends walk'],
    ['the friend walked', 'the friend walks'],
    ['our users walked', 'our users walk'],
    ['our user walked', 'our user walks'],
    ['the eye closed', 'the eye closes'],
    ['the eyes closed', 'the eyes close'],

    ['their colloseum will open', 'their colloseum opens'],
    ['their children will open', 'their children open'],

    // ['he walks', 'he walks'],
    // ['he walked', 'he walks'],
    // ['he will walk', 'he walks'],
    // ['he is walking', 'he is walking'],
    // ['he was walking', 'he is walking'],
    // ['i am walking', 'i am walking'],
    // ['he will be walking', 'he is walking'],
    //
    // ['he has walked', 'he had walked'],
    // ['he had walked', 'he had walked'],
    // ['he will have walked', 'he had walked'],
    // ['he has been walking', 'he had been walking'],
    // ['he had been walking', 'he had been walking'],
    // ['he will have been walking', 'he had been walking'],
    // ['got walked', 'got walked'],
    // ['was walked', 'was walked'],
    // ['were walked', 'were walked'],
    // // ['was being walked', 'had been walked'],
    // ['had been walked', 'had been walked'],
    // ['have been walked', 'had been walked'],
    // ['is walked', 'was walked'],
    // ['are walked', 'was walked'],
    // ['is being walked', 'was being walked'],
    // // ['has been walked', 'had been walked'],
    // ['had been walked', 'had been walked'],
    // ['will have been walked', 'had been walked'],
    // ['will be walked', 'had been walked'],
    // ['would be walked', 'would have been walked'],
    // ['would have been walked', 'would have been walked'],
    // ['is going to walk', 'was going to walk'],
    // ['did walk', 'did walk'],
    // ['used to walk', 'used to walk'],
    // ['do walk', 'did walk'],
    // ['does walk', 'did walk'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPresentTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
