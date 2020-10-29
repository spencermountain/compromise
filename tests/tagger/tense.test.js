const test = require('tape')
const nlp = require('../_lib')

test('verb-tense-tag:', function (t) {
  let arr = [
    //-ced
    ['lanced', 'PastTense'],
    ['balanced', 'PastTense'],
    ['seduced', 'PastTense'],

    //-shed
    ['impoverished', 'PastTense'],
    ['stashed', 'PastTense'],
    ['crashed', 'PastTense'],
    //-sed
    ['amused', 'PastTense'],
    ['bruised', 'PastTense'],
    ['crossed', 'PastTense'],
    ['dressed', 'PastTense'],
    ['exposed', 'PastTense'],
    ['tossed', 'PastTense'],
    ['tensed', 'PastTense'],
    ['hosed', 'PastTense'],

    //-led
    ['consoled', 'PastTense'],
    ['fuelled', 'PastTense'],
    ['nailed', 'PastTense'],
    ['nestled', 'PastTense'],
    ['riddled', 'PastTense'],
    ['sailed', 'PastTense'],
    ['totaled', 'PastTense'],
    ['whirled', 'PastTense'],

    //-ked
    ['linked', 'PastTense'],
    ['freaked', 'PastTense'],
    ['tucked', 'PastTense'],
    ['cocked', 'PastTense'],

    ['pounced', 'PastTense'],
    ['punched', 'PastTense'],
    ['rumbled', 'PastTense'],
    ['wetted', 'PastTense'],
    ['dubbed', 'PastTense'],
    ['trascribed', 'PastTense'],
    ['barred', 'PastTense'],
    ['vetoed', 'PastTense'],
    ['drenched', 'PastTense'],
    ['fetched', 'PastTense'],
    ['sighed', 'PastTense'],
    ['encouraged', 'PastTense'],
    ['messaged', 'PastTense'],
    ['tugged', 'PastTense'],
    ['wedged', 'PastTense'],
    ['beeped', 'PastTense'],
    ['topped', 'PastTense'],
    ['wiped', 'PastTense'],
    ['logged', 'PastTense'],
    ['displayed', 'PastTense'],
    ['skyped', 'PastTense'],
    ['swallowed', 'PastTense'],
    ['viewed', 'PastTense'],
    ['mooned', 'PastTense'],
    ['boozed', 'PastTense'],
    ['stowed', 'PastTense'],
    ['issued', 'PastTense'],
    ['accrued', 'PastTense'],
    ['defended', 'PastTense'],
    ['engulfed', 'PastTense'],
    ['fed', 'PastTense'],
    ['strafed', 'PastTense'],
    ['stifled', 'PastTense'],
    ['winged', 'PastTense'],
    ['amazed', 'PastTense'],
    ['boxed', 'PastTense'],
    ['shoved', 'PastTense'],
    ['attained', 'PastTense'],
    ['warmed', 'PastTense'],
    ['dried', 'PastTense'],
    ['implied', 'PastTense'],
    ['rallied', 'PastTense'],
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0])
  })
  t.end()
})
