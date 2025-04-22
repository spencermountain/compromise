import test from 'tape'
import nlp from './_lib.js'
const here = '[three/redact] '

test('redact:', function (t) {
  const arr = [
    [`spencer from 234 Main st at 423-3242 and spencer@gmail.com.`, '██████████ from ██████████ at ███████ and ██████████.'],
    [`in Toronto, Canada!`, `in ██████████!`],
    [`with Dr. Miller and his pal Joe`, `with ██████████ and his pal ██████████`],
  ]
  arr.forEach(a => {
    const [str, want] = a
    const have = nlp(str).redact().text()
    t.equal(have + '|', want + '|', here + ' - ' + str)
  })
  t.end()
})
