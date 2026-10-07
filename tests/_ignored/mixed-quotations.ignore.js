import test from 'tape'
import nlp from '../lib/three.js'
const here = '[ignored/mixed-quotations] '

// Deferred: Mixed single and double quotes do not produce these normalized quote selections.
test(here + 'multiple quotation test', function (t) {
  const arr = [
    [`My "String" "with many" adjacent "nested" 'quotes'`, ['string', 'with many', 'nested', 'quotes']],
    [`My "String 'with manys' adjacent" "nested" 'quotes'`, ['string with manys adjacent', 'nested', 'quotes']],
    [
      `"May's" 'third day' 'will be a "really cold" day' "in a" 'really cold "month"'`,
      ["may's", 'third day', 'will be a really cold day', 'in a', 'really cold month'],
    ],
  ]
  arr.forEach(function(a) {
    const r = nlp(a[0])
    const str = r.quotations().out('array')
    const msg = a[0] + '  -  ' + str
    t.deepEqual(str, a[1], msg)
  })
  t.end()
})
