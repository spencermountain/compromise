import test from 'tape'
import nlp from '../03-three/lib.js'
const here = '[hmm/verb-agree] '

// A blind survey of the verb conversions, over whole sentences: does the rest of the
// sentence still agree afterwards? Expected text comes from the language, not the code,
// and was written before running it. Each group prints its own score.
// These lines fail today - the ones that pass have moved to tests/03-three/verbs/agree-survey.test.js
//
// one example per line: 'method: input → expected'. A line without an arrow should not change.
const short = {
  past: 'toPastTense',
  present: 'toPresentTense',
  future: 'toFutureTense',
  inf: 'toInfinitive',
  gerund: 'toGerund',
  neg: 'toNegative',
  pos: 'toPositive',
}

const parse = str => str.trim().split('\n').map(line => {
  const [, method, rest] = line.match(/^(\w+): (.*)$/)
  const [input, want] = rest.split(' → ')
  return [short[method], input, want || input]
})

const group = (name, str) => {
  test(here + name, t => {
    const rows = parse(str)
    let passed = 0
    rows.forEach(([method, input, want]) => {
      const doc = nlp(input)
      doc.verbs()[method]()
      const have = doc.text()
      passed += have === want ? 1 : 0
      t.equal(have, want, `${here}[${name}] ${method}: ${input}`)
    })
    t.comment(`${here}${name}: ${passed}/${rows.length}`)
    t.end()
  })
}

// a contraction should stay one
group('contractions', `
past: he doesn't walk → he didn't walk
past: they don't walk → they didn't walk
present: he didn't walk → he doesn't walk
present: they didn't walk → they don't walk
future: he doesn't walk → he won't walk
past: he isn't here → he wasn't here
past: they aren't here → they weren't here
present: he wasn't here → he isn't here
present: they weren't here → they aren't here
past: he hasn't left → he hadn't left
past: i can't swim → i couldn't swim
`)

// two verbs with one subject
group('joined verbs', `
future: he walks and talks → he will walk and talk
future: she sang and danced → she will sing and dance
past: i walk or run → i walked or ran
neg: he walks and talks → he does not walk and talk
`)

// a second verb that does not carry the tense
group('verbs that stay', `
past: she lets him go → she let him go
`)

// can, will, should
group('modals', `
present: he could walk → he can walk
future: he can walk → he will be able to walk
past: he should walk
past: he might walk
neg: he can walk → he cannot walk
`)

// does not, and did not
group('negative', `
neg: everyone walks → everyone does not walk
`)

// the past tense is not made with 'ed'
group('irregular verbs', `
past: he lies down → he lay down
`)

// words inside, and after, the verb
group('adverbs and particles', `
future: he always walks → he will always walk
`)

// capitals, and marks beside the verb
group('case and punctuation', `
past: HE WALKS HOME → HE WALKED HOME
`)

// make the plain form, and the -ing form
group('infinitive and gerund', `
gerund: he walked home → he was walking home
gerund: they walked home → they were walking home
gerund: he will walk home → he will be walking home
`)
