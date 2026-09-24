
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)
nlp.verbose(true)

// let doc = nlp('i think dying blows')
// doc.debug()
const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const b = str => '\x1b[1m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'
const i = str => '\x1b[3m' + str + '\x1b[0m'
const ul = str => '\x1b[4m' + str + '\x1b[0m'

nlp.verbose(false)
const bugExamples = [
  ['Their daughter drew a rainbow.', 'drew', 'PastTense'],
  ['The gardener waters the roses daily.', 'waters', 'PresentTense'],
  ['The gardener will water the roses.', 'water', 'Infinitive'],
  ['The gardener might water the roses.', 'water', 'Infinitive'],
  ['The children water the seedlings.', 'water', 'PresentTense'],
  ['I\'m shaking, falling onto my knees', 'falling', 'Gerund'],
  ['Why did the engine stop?', 'stop', 'Infinitive'],
  ['Does she like chocolate?', 'like', 'Infinitive'],
  ['When does the store open?', 'open', 'Infinitive'],
  ['When will the rain stop?', 'stop', 'Infinitive'],
  ['A remarkably patient teacher answered calmly.', 'patient', 'Adjective'],
  ["Don't disturb the sleeping puppy.", 'sleeping', 'Adjective'],
  ['Rain soaked the pavement.', 'Rain', 'Noun'],
  ['Snow covered our driveway.', 'Snow', 'Noun'],
  ['She wrapped the present neatly.', 'present', 'Noun'],
  // These particles link a noun phrase here, rather than forming a phrasal verb.
  ['His birthday falls in June.', 'in', 'Preposition'],
  ['Send the invoice to billing@example.org.', 'to', 'Preposition'],


]

let failures = 0
bugExamples.forEach(([sentence, word, expected]) => {
  const example = nlp(sentence)
  const terms = example.json().flatMap(s => s.terms)
  const term = terms.find(t => t.text.toLowerCase() === word.toLowerCase())
  const actual = term ? term.tags : []
  const passed = actual.includes(expected)
  if (!passed) {
    failures += 1
    console.log(` ${yellow(sentence)}  ${green(word)}:  #${magenta(expected)} != ${actual.join(', ') || '(term missing)'}`)
  }
})
console.log(`\n${failures}/${bugExamples.length} candidate bugs reproduced`)

// nlp('fell in june').debug()
