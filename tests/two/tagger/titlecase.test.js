import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/titlecase] '

test('titlecase comparative before than', function (t) {
  const arr = [
    ['when quantity is Higher than 16 do X', 'is #Comparative than'],
    ['it is Bigger than that', 'is #Comparative than'],
    ['prices were Cheaper than expected', 'were #Comparative than'],
  ]
  arr.forEach(a => {
    t.equal(nlp(a[0]).has(a[1]), true, here + a[0])
  })
  t.equal(nlp('we met Young yesterday').has('#ProperNoun'), true, here + 'still a name')
  t.end()
})
