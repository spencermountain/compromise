import test from 'tape'
import nlp from '../_lib.js'

// Contrast silent endings with syllabic -le/-led, without changing existing fixtures.
const examples = [
  ['belle', 1],
  ['belles', 1],
  ['gazelle', 2],
  ['gazelles', 2],
  ['Michelle', 2],
  ['table', 2],
  ['tables', 2],
  ['bottle', 2],
  ['bottles', 2],
  ['cable', 2],
  ['bubbled', 2],
  ['tabled', 2],
  ['handled', 2],
  ['settled', 2],
  ['assembled', 3],
  ['boiled', 1],
  ['failed', 1],
  ['called', 1],
  ['spelled', 1],
  ['labeled', 2],
  ['walked', 1],
  ['wanted', 2],
  ['needed', 2],
  ['movement', 2],
  ['movements', 2],
  ['abatement', 3],
  ['abatements', 3],
  ['nicely', 2],
  ['hugely', 2],
  ['freely', 2],
  ['namely', 2],
  ['completely', 3],
  ['completeness', 3],
  ['awareness', 3],
  ['sameness', 2],
  ['graceful', 2],
  ['gracefully', 3],
  ['peaceful', 2],
  ['hopeless', 2],
  ['homeless', 2],
  ['ageless', 2],
  ['wholesome', 2],
  ['element', 3],
  ['elements', 3],
  ['implement', 3],
  ['implements', 3],
  ['settlement', 3],
  ['settlements', 3],
  ['gentleman', 3],
  ['excitement', 3],
  ['rudeness', 2],
  ['loneliness', 3],
  ['timely', 2],
  ['lively', 2],
]

test('speech: silent e and syllabic endings', t => {
  examples.forEach(([word, count]) => {
    const parts = nlp(word).syllables()[0]
    t.equal(parts.length, count, word)
    t.equal(parts.join(''), word, `${word}: reconstruction`)
  })
  t.end()
})
