import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/capitalized-gerund] '

// a gerund stays a gerund when capitalized mid-sentence after a verb
test('capitalized gerund after a verb', t => {
  const arr = [
    ['he was Creating a cake', 'Creating'],
    ['she is Running fast', 'Running'],
    ['i like Creating cakes', 'Creating'],
    ['the file needs Updating', 'Updating'],
    ['we are Cooking dinner tonight', 'Cooking'],
    ['he stopped Thinking about it', 'Thinking'],
    ['they keep Talking about it', 'Talking'],
  ]
  for (const [str, word] of arr) {
    const doc = nlp(str)
    t.equal(doc.match('#Gerund').text(), word, here + str)
  }
  t.end()
})

// consecutive titlecase words can still be names
test('capitalized gerund in a name stays a proper noun', t => {
  t.equal(nlp('it was Giving Tuesday').has('#Gerund'), false, here + 'Giving Tuesday')
  t.equal(nlp('she loves Boxing Day').has('#Gerund'), false, here + 'Boxing Day')
  t.equal(nlp('the Burning Man festival').match('Burning').has('#ProperNoun'), true, here + 'Burning Man')
  t.equal(nlp('he attended the Reading festival').match('Reading').has('#ProperNoun'), true, here + 'the Reading festival')
  t.end()
})
