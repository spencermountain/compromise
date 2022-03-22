import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-toPast] '

test('sentence-toPast', function (t) {
  let arr = [
    ['she is cool', 'she was cool'],
    ['she was cool', 'she was cool'],
    ['she will be cool', 'she was cool'],
    ['they are cool', 'they were cool'],
    ['they will be cool', 'they were cool'],

    [`By Orin's sophomore year she no longer twirls or incites Pep in any way.`, `By Orin's sophomore year she no longer twirled or incited Pep in any way.`],
    [`He sees something different each time he watches.`, `He saw something different each time he watched.`],
    [`It only happens when he watched them alone.`, `It only happened when he watched them alone.`],
    [`She devotes her life to her twirling and amateur film.`, `She devoted her life to her twirling and amateur film.`],
    [`Orin has trouble not burning the Jiffy Pop popcorn.`, `Orin had trouble not burning the Jiffy Pop popcorn.`],
    [`He likes to dim the track-lights when Joelle was out.`, `He liked to dim the track-lights when Joelle was out.`],
    [`Joelle's equipment isn't quite pro-caliber but her technique is very good.`, `Joelle's equipment was not quite pro-caliber but her technique was very good.`],
    [`He weighs fifty kilos and his skin is the color of squash.`, `He weighed fifty kilos and his skin was the color of squash.`],
    [`He has terrible shivering-attacks and also perspires.`, `He had terrible shivering-attacks and also perspired.`],
    [`He has a sty that scrapes one eyeball`, `He had a sty that scraped one eyeball`],

  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).sentences()
    doc.toPastTense()
    t.equal(doc.out(), a[1], here + '[toPast] ' + a[0])
    // doc.toPresentTense()
    // t.equal(doc.out(), a[0], here + '[toPresent] ' + a[0])
  })
  t.end()
})
