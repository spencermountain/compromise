import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-toGerund] '

test('sentence-toGerund', function (t) {
  let arr = [
    ['she is cool', 'she is being cool'],
    ['she was cool', 'she was being cool'],
    ['she is being cool', 'she is being cool'],
    ['they are cool', 'they are being cool'],
    ['they are being cool', 'they are being cool'],

    [`He sees something different each time he watches.`, `He is seeing something different each time he watches.`],
    [`It only happens when he watched them alone.`, `It only is happening when he watches them alone.`],
    [`She devotes her life to her twirling and amateur film.`, `She is devoting her life to her twirling and amateur film.`],
    [`Orin has trouble not burning the Jiffy Pop popcorn.`, `Orin is having trouble not burning the Jiffy Pop popcorn.`],
    // [`He likes to dim the track-lights when Joelle was out.`, `He is liking to dim the track-lights when Joelle was out.`],
    [`Joelle's equipment isn't quite pro-caliber but her technique is very good.`, `Joelle's equipment is not going to be quite pro-caliber but her technique is very good.`],
    // [`He weighs fifty kilos and his skin is the color of squash.`, `He is weighing fifty kilos and his skin is the color of squash.`],
    [`He has terrible shivering-attacks and also perspires.`, `He is having terrible shivering-attacks and also perspiring.`],
    [`He has a sty that scrapes one eyeball`, `He is having a sty that scrapes one eyeball`],

  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).sentences()
    doc.toGerund()
    t.equal(doc.out(), a[1], here + '[toGerund] ' + a[0])
  })
  t.end()
})
