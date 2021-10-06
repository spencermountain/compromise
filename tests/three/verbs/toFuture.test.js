import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toFuture] '

test('toFuture:', function (t) {
  let arr = [
    // known forms:
    ['he walked', 'he will walk'],
    ['i walked', 'i will walk'],
    ['we walked', 'we will walk'],
    ['they walked', 'they will walk'],
    ['the friends walked', 'the friends will walk'],
    ['the friend walked', 'the friend will walk'],
    ['our users walked', 'our users will walk'],
    ['our user walked', 'our user will walk'],
    ['the eye closed', 'the eye will close'],
    ['the eyes closed', 'the eyes will close'],

    ['their colloseum will open', 'their colloseum will open'],
    ['their children will open', 'their children will open'],

    ['he walks', 'he will walk'],
    ['he walked', 'he will walk'],
    ['he will walk', 'he will walk'],
    ['he is walking', 'he will be walking'],
    ['he was walking', 'he will be walking'],
    // ['i was walking', 'i am walking'],
    // ['we were walking', 'we are walking'],
    // ['i am walking', 'i am walking'],
    // ['he will be walking', 'he is walking'],
    // ['he really will be walking', 'he really is walking'],
    // ['he will really be walking', 'he is really walking'],
    // ['he will be really walking', 'he is really walking'],
    // //
    // ['he has walked', 'he has walked'],
    // ['he had walked', 'he has walked'],
    // ['he will have walked', 'he has walked'],
    // ['he really will have walked', 'he really has walked'],
    // ['he will really have walked', 'he has really walked'],
    // ['he will have really walked', 'he has really walked'],

    // ['he has been walking', 'he has been walking'],
    // ['he had been walking', 'he has been walking'],
    // ['he will have been walking', 'he has been walking'],
    // ['he really will have been walking', 'he really has been walking'],
    // ['he will really have been walking', 'he has really been walking'],
    // ['he will have really been walking', 'he has really been walking'],
    // ['he will have been really walking', 'he has been really walking'],

    // ['he got walked', 'he is walked'],
    // ['we got walked', 'we are walked'],
    // ['i got walked', 'i am walked'],
    // ['he was walked', 'he is walked'],
    // ['i was walked', 'i am walked'],
    // ['soldiers were walked', 'soldiers are walked'],

    // ['i am being walked', 'i am being walked'],
    // ['we are being walked', 'we are being walked'],
    // ['was being walked', 'is being walked'],
    // ['had been walked', 'is being walked'],
    // // ['has been walked', 'is being walked'], //?
    // ['have been walked', 'is being walked'],
    // ['usually is really walked often', 'usually is really walked often'],
    // ['were walked', 'are walked'],
    // ['was being walked', 'is being walked'],
    // // // ['has been walked', 'had been walked'],
    // ['had been walked', 'is being walked'],
    // // ['will have been walked', 'has been walked'],
    // ['will be walked', 'is being walked'],
    // ['he used to walk', 'he is walking'],
    // ['he did walk', 'he is walking'],
    // ['he must walk', 'he must walk'],
    // ['he must have walked', 'he must walk'],

    // ['would be walked', 'would be walked'],
    // ['would have been walked', 'would be walked'],
    // ['is going to walk', 'is walking'],
    // ['did walk', 'is walking'],
    // ['used to walk', 'is walking'],
    // // ['do walk', 'did walk'],
    // ['does walk', 'does walk'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toFutureTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
