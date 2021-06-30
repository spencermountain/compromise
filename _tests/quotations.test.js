const test = require('tape')
const nlp = require('./_lib')

test('quotation test', function (t) {
  const arr = [
    ['so I said "nah forget it"', 'nah forget it'],
    ['so I said "nah, forget it" go home to bel-air!', 'nah, forget it'],
    ["so I said 'nah, forget it' go home to bel-air!", 'nah, forget it'],
    ['so I said "nah" go home to bel-air!', 'nah'],
    ["so 'as if' i said", 'as if'],
    ["the 'truthiness' i said", 'truthiness'],
    ['yeah, “fun” and stuff', 'fun'],
    ['“Fun” and stuff', 'fun'],
    //dangling start/end
    ["'twas good cookin", ''],
    ["twas good cookin'", ''],
    // ["twas 'good cookin'", 'good cookin'],
    // ["'twas 'good cookin'", 'twas good cookin'],
    [`and "Dig Your own grave and Save".`, 'dig your own grave and save'],
  ]
  arr.forEach(function (a) {
    const r = nlp(a[0])
    const str = r.quotations().out('normal')
    const msg = a[0] + '  -  ' + str
    t.equal(str, a[1], msg)
  })
  t.end()
})

// test('multiple quotation test', function(t) {
//   const arr = [
//     [`My "String" "with many" adjacent "nested" 'quotes'`, ['string', 'with many', 'nested', 'quotes']],
//     [`My "String 'with manys' adjacent" "nested" 'quotes'`, ['string with manys adjacent', 'nested', 'quotes']],
//     [
//       `"May's" 'third day' 'will be a "really cold" day' "in a" 'really cold "month"'`,
//       ["may's", 'third day', 'will be a really cold day', 'in a', 'really cold month'],
//     ],
//   ]
//   arr.forEach(function(a) {
//     const r = nlp(a[0])
//     const str = r.quotations().out('array')
//     const msg = a[0] + '  -  ' + str
//     t.deepEqual(str, a[1], msg)
//   })
//   t.end()
// })
