import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPast] '

test('toPast:', function (t) {
  let arr = [
    // copula-based
    ['he is nice', 'he was nice'],
    ['he is really it', 'he was really it'],
    ['he was nice', 'he was nice'],
    ['he was walking', 'he was walking'],

    ['he walks', 'he walked'],
    ['he walked', 'he walked'],
    ['he will walk', 'he walked'],

    ['he is walking', 'he was walking'],
    ['he was walking', 'he was walking'],
    ['we are walking', 'we were walking'],
    ['we were walking', 'we were walking'],
    ['i am walking', 'i was walking'],
    ['he will be walking', 'he was walking'],

    ['he has walked', 'he had walked'],
    ['he had walked', 'he had walked'],
    ['he will have walked', 'he had walked'],

    ['he has been walking', 'he had been walking'],
    ['he had been walking', 'he had been walking'],
    ['he will have been walking', 'he had been walking'],

    ['got walked', 'got walked'],
    ['was walked', 'was walked'],
    ['were walked', 'were walked'],
    // ['was being walked', 'had been walked'],
    ['had been walked', 'had been walked'],
    ['have been walked', 'had been walked'],
    ['is walked', 'was walked'],
    ['are walked', 'was walked'],
    ['is being walked', 'was being walked'],
    // ['has been walked', 'had been walked'],
    ['had been walked', 'had been walked'],
    ['will have been walked', 'had been walked'],
    ['will be walked', 'had been walked'],

    ['would be walked', 'would have been walked'],
    ['would have been walked', 'would have been walked'],
    ['is going to walk', 'was going to walk'],
    ['did walk', 'did walk'],
    ['used to walk', 'used to walk'],
    ['do walk', 'did walk'],
    ['does walk', 'did walk'],
    ['he wants to walk', 'he wanted to walk'],
    ['he will want to walk', 'he wanted to walk'],

    // participle
    ['he can walk', 'he could walk'],
    ['he could walk', 'he could have walked'], //not sure
    ['he would walk', 'he would have walked'],//not sure
    ['he should walk', 'he should have walked'],

    ['he can drive', 'he could drive'],
    ['he could drive', 'he could have driven'],
    ['he would drive', 'he would have driven'],
    ['he should drive', 'he should have driven'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
