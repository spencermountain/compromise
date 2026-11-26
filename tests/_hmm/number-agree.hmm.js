import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/number-agree] '

// numbers().set(), add() and subtract() fix the counted noun, and its verb.
// Expected text comes from the language, not the code. These lines fail today -
// the ones that pass are in tests/03-three/numbers/noun-agreement.test.js
//
// one example per line: 'method n: input → expected'
const parse = str => str.trim().split('\n').map(line => {
  const [, method, n, rest] = line.match(/^(\w+) (-?\d+): (.*)$/)
  const [input, want] = rest.split(' → ')
  return [method, Number(n), input, want]
})

const group = (name, str) => {
  test(here + name, t => {
    const rows = parse(str)
    let passed = 0
    rows.forEach(([method, n, input, want]) => {
      const doc = nlp(input)
      doc.numbers()[method](n)
      const have = doc.text()
      passed += have === want ? 1 : 0
      t.equal(have, want, `${here}[${name}] ${method}(${n}): ${input}`)
    })
    t.comment(`${here}${name}: ${passed}/${rows.length}`)
    t.end()
  })
}

// the verb is read as a second noun
group('tagging', `
add 1: one dog barks → two dogs bark
add 1: one cat sleeps and eats → two cats sleep and eat
set 1: two dogs in the yard bark → one dog in the yard barks
`)

// a contraction should stay one
group('contractions', `
set 1: two dogs aren't here → one dog isn't here
set 1: two dogs don't bark → one dog doesn't bark
`)

// 'has' can also lead a second verb - 'she has him play'
group('clause after an object', `
set 1: she has two kids who play → she has one kid who plays
`)

// a sum of money, or a span of time, is one thing ('dollar' is also a #Unit, which takes no plural)
group('measures', `
set 5: one dollar is enough → five dollars is enough
set 2: one hour is plenty → two hours is plenty
`)
