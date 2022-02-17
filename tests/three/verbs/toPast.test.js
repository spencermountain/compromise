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
    ['we do walk', 'we did walk'],
    ['does walk', 'did walk'],
    ['he wants to walk', 'he wanted to walk'],
    ['he will want to walk', 'he wanted to walk'],

    // participle
    ['he can walk', 'he could walk'],
    ['he could walk', 'he could have walked'], //not sure
    ['he would walk', 'he would have walked'],//not sure
    ['he should walk', 'he should have walked'],

    // ['he can drive', 'he could drive'],
    // ['he could drive', 'he could have driven'],
    // ['he would drive', 'he would have driven'],
    // ['he should drive', 'he should have driven'],

    ['i write', 'i wrote'],
    ['spencer writes', 'spencer wrote'],
    ['i barely write', 'i barely wrote'],
    ['we barely write', 'we barely wrote'],
    ['we will barely write', 'we barely wrote'],
    // compound verb
    [`i'll start looking`, 'i started looking'],
    [`i won't start looking`, 'i did not start looking'],
    // negatives
    ['we do not write', 'we did not write'],
    ['we will not write', 'we did not write'],
    ['angelina does not write', 'angelina did not write'],
    ['angelina will not write', 'angelina did not write'],
    ['toronto barely starts', 'toronto barely started'],
    ['say it again', 'say it again'],
    // ['council votes to deny it', 'council voted to deny it'],
    ['nobody will say for certain', 'nobody said for certain'],
    ['he will say for certain', 'he said for certain'],
    ['she will not say for certain', 'she did not say for certain'],
    ['waiters are furious', 'waiters were furious'],
    ['the waiters will walk out', 'the waiters walked out'],
    ['this union will disrupt', 'this union disrupted'],
    ['this union has disrupted', 'this union had disrupted'],
    ['it will have real feelings', 'it had real feelings'],
    // ['it had no real feelings', 'it had no real feelings'],
    // ['it will not have studied enough', 'it had not studied enough'],
    ['spencer will have learned enough', 'spencer learned enough'],
    // ['spencer will not have learned enough', 'spencer had not learned enough'],


    //oke
    ['awakes', 'awoke'],
    //ade
    ['makes', 'made'],
    ['remakes', 'remade'],
    //ook
    ['shakes', 'shook'],

    ['takes', 'took'],
    ['overtakes', 'overtook'],
    ['undertakes', 'undertook'],
    ['mistakes', 'mistook'],
    ['retakes', 'retook'],
    //aked
    ['bakes', 'baked'],
    ['fakes', 'faked'],
    ['snakes', 'snaked'],

    // sneaky past participles
    // present
    // ['i am being awaken', 'i have been awaken'],
    ['i should be awaken', 'i should have been awaken'],
    // past->past
    ['i had been awaken', 'i had been awaken'],
    ['i should have been awaken', 'i should have been awaken'],
    // gerund
    ['when it is raining', 'when it was raining'],
    // ['i think it will be raining', 'i thought it will be raining'],
    ['when it was raining', 'when it was raining'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
