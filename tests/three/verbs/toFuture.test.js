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
    ['i was walking', 'i will be walking'],
    ['we were walking', 'we will be walking'],
    ['i am walking', 'i will be walking'],
    ['he will be walking', 'he will be walking'],

    ['he has walked', 'he will have walked'],
    ['he had walked', 'he will have walked'],
    ['he will have walked', 'he will have walked'],
    ['he really will have walked', 'he really will have walked'],
    ['he will really have walked', 'he will really have walked'],
    ['he will have really walked', 'he will have really walked'],

    ['he has been walking', 'he will have been walking'],
    ['he had been walking', 'he will have been walking'],
    ['he will have been walking', 'he will have been walking'],

    ['he got walked', 'he will get walked'],
    ['we got walked', 'we will get walked'],
    ['i got walked', 'i will get walked'],
    ['he was walked', 'he will be walked'],
    ['i was walked', 'i will be walked'],
    ['soldiers were walked', 'soldiers will be walked'],

    ['i am being walked', 'i will be walked'],
    ['we are being walked', 'we will be walked'],
    ['he was being walked', 'he will be walked'],
    // ['had been walked', 'will be walked'], //?
    // ['has been walked', 'will be walked'], //?
    ['have been walked', 'will be walked'],
    ['were walked', 'will be walked'],
    ['was being walked', 'will be walked'],
    // // // ['has been walked', 'had been walked'],
    ['had been walked', 'will be walked'],
    // // ['will have been walked', 'has been walked'],
    ['will be walked', 'will be walked'],

    ['would be walked', 'will be walked'],
    ['would have been walked', 'will have been walked'],
    ['is going to walk', 'is going to walk'],
    ['did walk', 'will walk'],
    ['used to walk', 'will walk'],
    // // ['do walk', 'did walk'],
    ['does walk', 'will walk'],
    // ['he used to walk', 'he will be walking'],
    ['he did walk', 'he will walk'],
    // ['he must walk', 'he must walk'],
    // ['he must have walked', 'he must walk'],

    // modal/conditions are weird
    // ['he can walk', 'he can walk'],
    // ['he could walk', 'he can walk'],
    // ['he should walk', 'he should walk'],

    // want-infinitive
    ['he wants to walk', 'he will want to walk'],
    ['he wanted to walk', 'he will want to walk'],
    ['he will want to walk', 'he will want to walk'],

    // conjugation -ed issues
    [`sing`, `will sing`],
    [`sung`, `will sing`],
    [`appeared`, `will appear`],
    [`sparred`, `will sparr`],
    [`strayed`, `will stray`],
    [`snarled`, `will snarl`],
    [`clawed`, `will claw`],
    [`faced`, `will face`],
    [`trumped`, `will trump`],
    [`out-lived`, `will out-live`],
    [`out-live`, `will out-live`],
    [`trumpeted`, `will trumpet`],
    [`slugged`, `will slug`],
    [`slashed`, `will splash`],
    [`trounced`, `will trounce`],
    [`speared`, `will spear`],
    [`colored`, `will color`],
    [`cured`, `will cure`],
    [`roared`, `will roar`],
    [`withered`, `will wither`],
    [`he bloated`, `he will bloat`],
    [`he drifted`, `he will drift`],
    [`he doubted`, `he will doubt`],
    [`he rooted`, `he will root`],
    [`he annoyed`, `he will annoy`],
    [`he enjoyed`, `he will enjoy`],
    [`he prayed`, `he will pray`],
    [`he preyed`, `he will prey`],
    [`he sprayed`, `he will sprayed`],
    [`he lied`, `he will lie`],
    [`he qualified`, `he will qualify`],
    [`he echoed`, `he will echo`],
    [`he uploaded`, `he will upload`],
    [`he fluffed`, `he will fluff`],
    [`he engulfed`, `he will engulf`],
    [`he ruled`, `he will rule`],
    [`he sailed`, `he will sail`],
    [`he piled`, `he will pile`],
    [`he piled-on`, `he will pile-on`],
    [`he styled`, `he will style`],
    [`he totaled`, `he will total`],
    [`he scheduled`, `he will schedule`],
    [`he pulled`, `he will pull`],
    [`she whirled`, `she will whirl`],
    [`she vexed`, `she will vex`],
    [`she relaxed`, `she will relax`],
    [`she absorbed`, `she will absorb`],
    [`she aligned`, `she will align`],
    [`she ruined`, `she will ruin`],
    [`she turned`, `she will turn`],
    [`it rained`, `it will rain`],
    [`she worsened`, `she will worsen`],
    [`she filmed`, `she will film`],
    [`we nicknamed`, `we will nickname`],
    [`we doomed`, `we will doom`],
    [`we summed`, `we will sum`],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toFutureTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
