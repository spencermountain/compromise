import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/misc/quotations] '

test('quotation test', function (t) {
  const arr = [
    ['so I said "nah forget it"', 'nah forget it'],
    ['so I said "nah, forget it" go home to bel-air!', 'nah forget it'],
    ["so I said 'nah, forget it' go home to bel-air!", 'nah forget it'],
    ['so I said "nah" go home to bel-air!', 'nah'],
    ["so 'as if' i said", 'as if'],
    ["the 'truthiness' i said", 'truthiness'],
    ['yeah, “fun” and stuff', 'fun'],
    ['“Fun” and stuff', 'fun'],
    ['démontre que «le gouvernement» exploite', 'le gouvernement'],
    //dangling start/end
    ["'twas good cookin", ''],
    ["twas good cookin'", ''],
    // ["twas 'good cookin'", 'good cookin'],
    // ["'twas 'good cookin'", 'twas good cookin'],
    [`and "Dig Your own grave and Save".`, 'dig your own grave and save'],

    [`i heard "the news" today`, 'the news'],
    [`i heard 'news' today`, 'news'],
    [`yo. i heard "the very sad news" today`, 'the very sad news'],
    [`i heard "the news today`, ''],
  ]
  arr.forEach(function (a) {
    const r = nlp(a[0])
    const str = r.quotations().out('normal')
    const msg = a[0] + '  -  ' + str
    t.equal(str, a[1], here + msg)
  })
  t.end()
})
