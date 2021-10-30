import test from 'tape'
import nlp from './_lib.js'
const here = '[three/redact] '

test('redact:', function (t) {
  let arr = [
    [`spencer from 234 Main st at 423-3242 and spencer@gmail.com.`, '██████████ from ██████████ at ███████ and ██████████.'],
    [`in Toronto, Canada!`, `in ██████████!`],
  ]
  arr.forEach(a => {
    let [str, want] = a
    let have = nlp(str).redact().text()
    t.equal(have + '|', want + '|', here + ' - ' + str)
  })
  t.end()
})
