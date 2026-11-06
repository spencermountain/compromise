import test from 'tape'
import nlp from '../lib.js'
const here = '[three/topics/first-name-noun] '

// a noun after a first name, that is not their surname
// [sentence, person]
const notSurname = [
  ['we saw John there', 'John'],
  ['we saw Mary there', 'Mary'],
  ['we saw Yvonne there.', 'Yvonne'],
  ['i left John there', 'John'],
  ['is John there?', 'John'],
  ['we saw john there', 'john'],
  ['i gave John money', 'John'],
  ['i gave Mary advice', 'Mary'],
  ['i told John everything', 'John'],
  ['i told John something', 'John'],
  ['i gave John water', 'John'],
  ['we saw John tonight', 'John'],
  ['she made Mary dinner', 'Mary'],
  ['i bought John lunch', 'John'],
  ['we took John home', 'John'],
  // lowercase, a verb that takes a person and a thing
  ['i gave john money', 'john'],
  ['i gave mary advice', 'mary'],
  ['she gave john water', 'john'],
  ['he gives john lunch', 'john'],
  ['i lent john money', 'john'],
  ['we handed john cash', 'john'],
  ['i bought john lunch', 'john'],
  // lowercase, never a surname
  ['i told john everything', 'john'],
  ['i told john something', 'john'],
  ['i told mary nothing', 'mary'],
]

// real surnames, in title-case and lowercase
const isSurname = [
  ['we saw John Smith', 'John Smith'],
  ['we saw John Zebrowski', 'John Zebrowski'],
  ['i met Mary Bell', 'Mary Bell'],
  ['i met John Baker', 'John Baker'],
  ['i met Sarah Stone', 'Sarah Stone'],
  ['i met James Cook', 'James Cook'],
  ['we saw John Waters', 'John Waters'],
  ['we saw John Smith there', 'John Smith'],
  ['i met john smith', 'john smith'],
  ['i met john wood', 'john wood'],
  ['i read ebenezer scrooge', 'ebenezer scrooge'],
  // initials and hyphenated names
  ['Jim B', 'Jim B'],
  ['we met Brooke M.', 'Brooke M.'],
  ['a fifth of Jack D.', 'Jack D.'],
  ['produced by Yong-hwa', 'Yong-hwa'],
  // surnames that are also common nouns
  ['i called ed wood', 'ed wood'],
  ['i told john wood', 'john wood'],
  ['tell dan brown', 'dan brown'],
  ['ask brad pitt', 'brad pitt'],
  // surnames after a verb that takes a person and a thing
  ['i gave john smith', 'john smith'],
  ['we gave Sarah Stone', 'Sarah Stone'],
  ['i gave John Baker', 'John Baker'],
  ['i gave john smith money', 'john smith'],
]

test('first name then a noun', function (t) {
  notSurname.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array').map(s => s.replace(/[.?]$/, '')), [want], here + str)
    t.equal(doc.has('#LastName'), false, here + `${str} - no #LastName`)
  })
  isSurname.forEach(([str, want]) => {
    const doc = nlp(str)
    t.deepEqual(doc.people().out('array'), [want], here + str)
    t.equal(doc.has('#LastName'), true, here + `${str} - has #LastName`)
  })
  t.end()
})

// 'al' is an abbreviation, and 'gore' is a noun
// [sentence, people]
const alGore = [
  ['i met Al Gore', ['Al Gore']],
  ['i met al gore', ['al gore']],
  ['Al Gore spoke', ['Al Gore']],
  ['Al Gore', ['Al Gore']],
  ["Al Gore's speech was long", ["Al Gore's"]],
  ['AL GORE SPOKE', ['AL GORE']],
  // other readings stay
  ['the movie had too much gore', []],
  ['blood and gore', []],
  ['i watched Al Jazeera', []],
  ['Al Qaeda claimed it', []],
  ['Al Pacino was great', ['Al Pacino']],
  ['i met Al Smith', ['Al Smith']],
  ['Smith et al found it', ['Smith']],
]

test('al gore', function (t) {
  alGore.forEach(([str, want]) => {
    t.deepEqual(nlp(str).people().out('array'), want, here + str)
  })
  t.ok(nlp('Vice President Al Gore spoke').people().has('al gore'), here + 'vice president al gore')
  t.end()
})
