
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)
nlp.verbose(true)

let doc = nlp('i think dying blows')
doc.debug()

// Candidate tagger bugs from tests/two/match-spec.test.js.
// Run: node scratch.js
// Check only the disputed word, so unrelated convention differences do not obscure it.
nlp.verbose(false)
const bugExamples = [
  ['the dog runs', 'runs', 'PresentTense'],
  ['the dog runs', 'dog', 'Noun'],
  ['The gardener waters the roses daily.', 'waters', 'PresentTense'],
  ['The gardener will water the roses.', 'water', 'Infinitive'],
  ['The gardener might water the roses.', 'water', 'Infinitive'],
  ['The children water the seedlings.', 'water', 'PresentTense'],
  ['Why did the engine stop?', 'stop', 'Infinitive'],
  ['Did the manager approve our request?', 'approve', 'Infinitive'],
  ['Does she like chocolate?', 'like', 'Infinitive'],
  ['When does the store open?', 'open', 'Infinitive'],
  ['When will the rain stop?', 'stop', 'Infinitive'],
  ['A remarkably patient teacher answered calmly.', 'patient', 'Adjective'],
  ["Don't disturb the sleeping puppy.", 'sleeping', 'Adjective'],
  ['The violinist smiled, bowed, and left.', 'violinist', 'Noun'],
  ['The violinist smiled, bowed, and left.', 'left', 'PastTense'],
  ['Rain soaked the pavement.', 'Rain', 'Noun'],
  ['Snow covered our driveway.', 'Snow', 'Noun'],
  ['Their daughter drew a rainbow.', 'drew', 'PastTense'],
  ['The tomatoes need more sunlight.', 'sunlight', 'Noun'],
  ['She wrapped the present neatly.', 'present', 'Noun'],
  ['Slice the bread carefully.', 'Slice', 'Verb'],
  ['Visit https://example.org for details.', 'Visit', 'Verb'],
  ['These narrow tunnels connect distant chambers.', 'chambers', 'Plural'],
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
  }
  console.log(`${passed ? 'PASS' : 'FAIL'}: ${sentence}`)
  console.log(`  ${word}: expected #${expected}; actual ${actual.join(', ') || '(term missing)'}`)
})
console.log(`\n${failures}/${bugExamples.length} candidate bugs reproduced`)
