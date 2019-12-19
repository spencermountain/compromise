const test = require('tape')
const nlp = require('../_lib')

test('verb-tense-tag:', function(t) {
  let arr = [
    ['linked', 'PastTense'],
    ['impoverished', 'PastTense'],
    ['stashed', 'PastTense'],
    ['pounced', 'PastTense'],
    ['punched', 'PastTense'],
    ['rumbled', 'PastTense'],
    ['lanced', 'PastTense'],
    ['wetted', 'PastTense'],
    ['amused', 'PastTense'],
    ['bruised', 'PastTense'],
    ['crossed', 'PastTense'],
    ['dressed', 'PastTense'],
    ['exposed', 'PastTense'],
    ['tossed', 'PastTense'],
    ['tensed', 'PastTense'],
    ['hosed', 'PastTense'],
    ['balanced', 'PastTense'],
    ['seduced', 'PastTense'],
    ['dubbed', 'PastTense'],
    ['trascribed', 'PastTense'],
    ['barred', 'PastTense'],
    ['vetoed', 'PastTense'],
    ['consoled', 'PastTense'],
    ['fuelled', 'PastTense'],
    ['nailed', 'PastTense'],
    ['nestled', 'PastTense'],
    ['riddled', 'PastTense'],
    ['sailed', 'PastTense'],
    ['totaled', 'PastTense'],
    ['whirled', 'PastTense'],
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
  ]
  arr.forEach(function(a) {
    let doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0])
  })
  t.end()
})
