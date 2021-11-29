import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-plural] '

test('plural-verbs toPast:', function (t) {
  let arr = [
    ['i write', 'i wrote'],
    ['spencer writes', 'spencer wrote'],
    ['i barely write', 'i barely wrote'],
    ['we barely write', 'we barely wrote'],
    ['we will barely write', 'we barely wrote'],
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
    ['this union has disrupted', 'this union disrupted'],
    ['it will have real feelings', 'it had real feelings'],
    // ['it had no real feelings', 'it had no real feelings'],
    // ['it will not have studied enough', 'it had not studied enough'],
    ['spencer will have learned enough', 'spencer learned enough'],
    // ['spencer will not have learned enough', 'spencer had not learned enough'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], here + '[toPast] ' + a[0])
  })
  t.end()
})

test('plural-verbs toFuture:', function (t) {
  let arr = [
    ['i write', 'i will write'],
    ['spencer writes', 'spencer will write'],
    // ['i barely write', 'i will barely write'],
    // ['we barely write', 'we will barely write'],
    // ['we will barely write', 'we will barely write'],
    // [`i'll start looking`, "i'll start looking"],
    [`i won't start looking`, 'i will not start looking'],
    // negatives
    ['we do not write', 'we will not write'],
    ['we will not write', 'we will not write'],
    ['angelina does not write', 'angelina will not write'],
    ['angelina will not write', 'angelina will not write'],
    // ['toronto barely starts', 'toronto will barely start'],
    ['say it again', 'say it again'],
    // ['council votes to deny it', 'council will vote to deny it'],
    ['nobody will say for certain', 'nobody will say for certain'],
    ['he will say for certain', 'he will say for certain'],
    ['she will not say for certain', 'she will not say for certain'],
    ['waiters are furious', 'waiters will be furious'],
    ['the waiters will walk out', 'the waiters will walk out'],
    ['this union will disrupt', 'this union will disrupt'],
    ['this union has disrupted', 'this union will disrupt'],
    ['it will have real feelings', 'it will have real feelings'],
    // ['it had no real feelings', 'it had no real feelings'],
    // ['it will not have studied enough', 'it had not studied enough'],
    // ['spencer will have learned enough', 'spencer will have learned enough'],
    // ['spencer will not have learned enough', 'spencer had not learned enough'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toFutureTense()
    t.equal(doc.text(), a[1], here + '[toFut] ' + a[0])
  })
  t.end()
})
