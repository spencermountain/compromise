import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-toFuture] '

test('sentence-toFuture', function (t) {
  let arr = [
    ['she is cool', 'she will be cool'],
    ['she was cool', 'she will be cool'],
    ['she will be cool', 'she will be cool'],
    ['they are cool', 'they will be cool'],
    ['they will be cool', 'they will be cool'],

    [`He sees something different each time he watches.`, `He will see something different each time he watches.`],
    [`It only happens when he watched them alone.`, `It only will happen when he watches them alone.`],
    [`She devotes her life to her twirling and amateur film.`, `She will devote her life to her twirling and amateur film.`],
    [`Orin has trouble not burning the Jiffy Pop popcorn.`, `Orin will have trouble not burning the Jiffy Pop popcorn.`],
    [`He likes to dim the track-lights when Joelle was out.`, `He will like to dim the track-lights when Joelle was out.`],
    [`Joelle's equipment isn't quite pro-caliber but her technique is very good.`, `Joelle's equipment will not be quite pro-caliber but her technique will be very good.`],
    [`He weighs fifty kilos and his skin is the color of squash.`, `He will weigh fifty kilos and his skin will be the color of squash.`],
    [`He has terrible shivering-attacks and also perspires.`, `He will have terrible shivering-attacks and also perspires.`],
    [`He has a sty that scrapes one eyeball`, `He will have a sty that scrapes one eyeball`],

  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).sentences()
    doc.toFutureTense()
    t.equal(doc.out(), a[1], here + '[toFuture] ' + a[0])
    // doc.toPresentTense()
    // t.equal(doc.out(), a[0], here + '[toPresent] ' + a[0])
  })
  t.end()
})
