import test from 'tape'
import nlp from './_lib.js'
const here = '[four/facts]'

let arr = [
  {
    txt: 'the beautiful girl walked slowly toward the store',
    subj: 'girl',
    action: 'walk',
  }
]

test('facts', function (t) {
  arr.forEach(obj => {
    let { txt, subj, action } = obj
    let fact = nlp(txt).facts()[0]
    t.equal(fact.subject.root, subj, here + `[subj] ${subj}`)
    t.equal(fact.action.root, action, here + `[action] ${action}`)
  })
  t.end()
})
