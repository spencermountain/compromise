import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-find] '

test('verb-splitter:', function (t) {
  let arr = [
    [`poodles like being pampered`, ['like', 'being pampered']],
    [`i can help fix the tire`, ['can help', 'fix']],
    [`i will help out the team`, ['will help out']],
    [`we breifly studied up on the theory`, ['breifly studied up']],
    [`we studied breifly up in the lobby`, ['studied breifly']],
    [`it waxed and waned`, ['waxed', 'waned']],
    [`he ran, swam, and biked`, ['ran,', 'swam,', 'biked']],
    [`he ran to get it`, ['ran to get']],
    [`he should have earned or valued it by now`, ['should have earned', 'valued']],
    [`he should not have shown such skill`, ['should not have shown']],
    [`walk faster`, ['walk']],
    [`he professes love`, ['professes']],
    [`we go eat`, ['go eat']],
    [`we will go eat`, ['will go eat']],
    [`we will walk and eat`, ['will walk', 'eat']],
    [`when the rain pours, come have a drink`, ['pours,', 'come have']],
    // [ `poodles like to be pampered`,  verbs: ['like', 'be pampered'] ] 
    // pastTense-pastTense
    [`i have been told`, ['have been told']],
    [`Everyone he met told him`, ['met', 'told']],
    [`Everyone he met had told him`, ['met', 'had told']],
    [`Particularly sought was information`, ['Particularly sought', 'was']],
    [`The one he invented was expensive`, ['invented', 'was']],
    // [`fans that are blowing feel amazing`, ['are blowing', 'feel amazing']],
    [`fans that were blowing felt amazing`, ['were blowing', 'felt']],
    // [`recognizing written language`, ['recognizing']],
    [`I'm getting written up`, ['getting written up']],

    // -- verb [to] verb --
    [`while being rocked to sleep`, ['being rocked to sleep']],
    [`whilst being rocked to permit even roasting`, ['being rocked', 'permit', 'even roasting']],
    [`he would not stop asking questions`, ['would not stop asking']],
    [`he was pissed off for having to wait`, ['was', 'having to wait']],
    [`so I'm not going to walk a mile`, ['not going to walk']],
    [`Some refused to leave`, ['refused to leave']],
    [`I got to feeling like Superman`, ['got to feeling']],
    [`you mean to do it`, ['mean to do']],
    [`They used to wander around here`, ['used to wander around']],
    [`it continues to function as a phone`, ['continues to function']],
    [`i am fully expecting to find the piece of rubber`, ['am fully expecting to find']],
    // [`the kids are not to be allowed to swim`, ['']],
    [`We have got to do better`, ['have got to do']],
    // [`trying to get loose`, ['']],
    [` I look forward to coming to your city`, ['look forward to coming']],
    [` I did not seem to mind`, ['did not seem to mind']],
    // [``, ['']],
  ]
  arr.forEach(a => {
    let [str, vbs] = a
    let verbs = nlp(str).verbs().out('array')
    t.deepEqual(verbs, vbs, here + str)
  })
  t.end()
})

//dont take it too-far
test('verb-greedy:', function (t) {
  let arr = nlp('he would be, had he survived').verbs().json()
  t.equal(arr.length, 2, here + 'split-on-clause')

  arr = nlp('we walked, talked, and sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list')

  arr = nlp('we walked, talked, and quickly sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list2')

  arr = nlp('we suddenly walked, talked, and abruptly sang').verbs().json()
  t.equal(arr.length, 3, here + 'split-on-list3')

  arr = nlp('we really').verbs().json()
  t.equal(arr.length, 0, here + 'adverb-isnt-a-verb')

  arr = nlp('we really really').verbs().json()
  t.equal(arr.length, 0, here + 'two-adverbs-isnt-a-verb')

  arr = nlp('not good').verbs().json()
  t.equal(arr.length, 0, here + 'not-isnt-a-verb')

  let str = nlp('we must not').verbs().out('normal')
  t.equal(str, 'must not', here + 'verb-not')

  str = nlp('we must really').verbs().out('normal')
  t.equal(str, 'must really', here + 'verb-adverb')

  str = nlp('we must really not').verbs().out('normal')
  t.equal(str, 'must really not', here + 'verb-adverb-not')

  str = nlp('the skill you can sell is your knowledge').verbs().eq(0).out('normal')
  t.equal(str, 'can sell', here + 'can sell is')

  str = nlp('what you can sell will be').verbs().eq(0).out('normal')
  t.equal(str, 'can sell', here + 'can sell will be')

  t.end()
})
