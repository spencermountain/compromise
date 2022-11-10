import test from 'tape'
import nlp from './_lib.js'
const here = '[four/facts]'

let arr = [
  {
    txt: 'the beautiful girl walked slowly toward the store',
    facts: [{
      subj: 'girl',
      verb: 'walk',
      mod: 'toward'
    }]
  },
  {
    txt: 'everybody swam carefully to the rock',
    facts: [{
      subj: 'everybody',
      verb: 'swim',
      mod: 'to'
    }]
  },
  {
    txt: 'please eat carefully in the kitchen',
    facts: [{
      verb: 'eat',
      mod: 'in'
    }]
  },
  {
    txt: 'spencer made a sandwich with tomato',
    facts: [{
      subj: 'spencer',
      verb: 'make',
      obj: 'sandwhich',
    }]
  },
  {
    txt: 'the whole team waited',
    facts: [{
      subj: 'team',
      verb: 'wait',
      obj: null,
    }]
  },
  {
    txt: 'the player clapped for the manager',
    facts: [{
      subj: 'player',
      verb: 'clap',
      obj: 'manager',
    }]
  },
  {
    txt: 'he made a sandwich for dinner with tomatos and cheese and sang a tune',
    facts: [{
      subj: 'he',
      verb: 'make',
      obj: 'sandwich',
    }, {
      subj: 'he',
      verb: 'sing',
      obj: 'tune',
    }]
  },
  // {
  //   txt: '',
  //   facts: [{
  //     subj: '',
  //     verb: '',
  //     mod: ''
  //   }]
  // },
]

test('facts', function (t) {
  arr.forEach(obj => {
    let all = nlp(obj.txt).facts().json()

    t.equal(all.length, obj.facts.length, here + ` [facts] ${obj.txt}`)

    obj.facts.forEach((want, i) => {
      let mine = all[i]
      let msg = `${here} #${i}`

      // subject
      if (want.subj) {
        t.equal(want.subj, mine.subj.root, msg + ` [subj] ${want.subj}`)
      }
      // action
      if (want.verb) {
        t.equal(want.verb, mine.verb.root, msg + ` [verb] ${want.verb}`)
      }

      // modifiers
      if (want.mod) {
        // t.ok(fact.modifiers[mod], here + `[subj] ${subj}`)
      }
    })
  })
  t.end()
})
