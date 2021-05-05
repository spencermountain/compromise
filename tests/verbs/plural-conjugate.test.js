const test = require('tape')
const nlp = require('../_lib')

test('plural-verbs toPresent:', function (t) {
  let arr = [
    //past->pres
    ['i wrote', 'i write'],
    ['she wrote', 'she writes'],
    ['we wrote', 'we write'],
    ['they wrote', 'they write'],
    ['it wrote', 'it writes'],
    //future->pres
    ['i will go', 'i go'],
    ['she will go', 'she goes'],
    ['we will go', 'we go'],
    ['they will go', 'they go'],
    ['it will go', 'it goes'],
    //past+adv->pres
    ['i nearly slipped', 'i nearly slip'],
    ['she nearly slipped', 'she nearly slips'],
    ['we nearly slipped', 'we nearly slip'],
    ['they nearly slipped', 'they nearly slip'],
    ['it nearly slipped', 'it nearly slips'],
    //adv+past->pres
    ['i really learned from it', 'i really learn from it'],
    ['he really learned from it', 'he really learns from it'],
    ['everybody really learned from it', 'everybody really learns from it'],
    ['someone really learned from it', 'someone really learns from it'],
    ['eventually, i will learn from it', 'eventually, i learn from it'],
    // neg->pres
    // ['i did not really yell', 'i do not really yell'],
    // ['i do not really yell', 'i do not really yell'],
    // ['i never yell', 'i never yell'],
    // ['i never yelled', 'i never yelled'],
    ['i spoke quickly', 'i speak quickly'],
    ['i do not speak quickly', 'i do not speak quickly'],
    // ['he will never yell', 'he never yells'],
    // ['he never yelled', 'he never yelled'],
    ['he spoke quickly', 'he speaks quickly'],
    ['he did not speak quickly', 'he does not speak quickly'],
    ['we did not speak quickly', 'we do not speak quickly'],
    ['we spoke quickly', 'we speak quickly'],
    ['it spoke quickly', 'it speaks quickly'],
    // copula
    [`i am there`, 'i am there'],
    [`i was there`, 'i am there'],
    [`i will be there`, 'i am there'],
    [`spencer is there`, 'spencer is there'],
    [`spencer was there`, 'spencer is there'],
    [`spencer will be there`, 'spencer is there'],
    [`we are there`, 'we are there'],
    [`we were there`, 'we are there'],
    [`we will be there`, 'we are there'],
    // * -> pres
    [`i do not see it`, `i do not see it`],
    [`i see it clearly`, `i see it clearly`],
    [`i saw it clearly`, `i see it clearly`],
    [`he saw it`, `he sees it`],
    [`he saw it clearly`, `he sees it clearly`],
    [`he sees it clearly`, `he sees it clearly`],
    [`they see it clearly`, `they see it clearly`],
    [`they really saw it`, `they really see it`],
    [`he will really see it`, `he really sees it`],
    ['toronto barely started', 'toronto barely starts'],
    ['toronto hardly even started', 'toronto hardly even starts'],
    // ['toronto did not even start', 'toronto does not even start'],
    ['people will seldom start looking', 'people seldom start looking'],
    ['people seldom started looking', 'people seldom start looking'],
    ['he clearly did not suggest', 'he clearly does not suggest'],
    ['they clearly did not suggest', 'they clearly do not suggest'],
    ['the library did not provide', 'the library does not provide'],
    ['the library clearly will not provide', 'the library clearly does not provide'],
    // ['this union had disrupted', 'this union has disrupted'],
    ['john wrote everyday', 'john writes everyday'],
    // ['spencer and john wrote everyday', 'spencer and john write everyday'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPresentTense()
    t.equal(doc.text(), a[1], '[toPres] ' + a[0])
  })
  t.end()
})

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
    ['council votes to deny it', 'council voted to deny it'],
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
    t.equal(doc.text(), a[1], '[toPast] ' + a[0])
  })
  t.end()
})
