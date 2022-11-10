import test from 'tape'
import nlp from './_lib.js'
const here = '[four/facts]'

let arr = [
  {
    txt: 'the beautiful girl walked slowly toward the store',
    type: 'Action',
    subj: 'girl',
    action: 'walk',
    mod: 'toward'
  },
  {
    txt: 'everybody swam carefully to the rock',
    type: 'Action',
    subj: 'everybody',
    action: 'swim',
    mod: 'to'
  },
  {
    txt: 'please eat carefully in the kitchen',
    type: 'Instruction',
    action: 'eat',
    mod: 'in'
  },
  // {
  //   txt: '',
  //   type: '',
  //   subj: '',
  //   action: '',
  // },
  // {
  //   txt: '',
  //   subj: '',
  //   action: '',
  // },
]

test('facts', function (t) {
  arr.forEach(obj => {
    let { txt, type, subj, action, mod } = obj
    let fact = nlp(txt).facts()[0]
    // type
    t.equal(fact.type, type, here + `[type] ${action}`)

    // subject
    if (subj) {
      t.equal(fact.subject.root, subj, here + `[subj] ${subj}`)
    }
    // action
    t.equal(fact.action.root, action, here + `[action] ${action}`)

    // modifiers
    if (mod) {
      t.ok(fact.modifiers[mod], here + `[subj] ${subj}`)
    }
  })
  t.end()
})
