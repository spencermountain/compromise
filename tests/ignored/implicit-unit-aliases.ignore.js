import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[ignored/implicit-unit-aliases] '

// Deferred: Literal matching does not expand the ft suffix to feet.
test(here + 'implicit units', function (t) {
  const arr = [
    // ['99%', '99%'],
    // ['99%', '99 percent'],
    // ['99%', '%'],
    ['9ft', 'feet'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    t.ok(doc.has(a[1]), here + a[1])
  })
  t.end()
})
