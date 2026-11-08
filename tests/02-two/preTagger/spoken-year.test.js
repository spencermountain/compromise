import test from 'tape'
import nlp from '../lib.js'
const here = '[two/preTagger/spoken-year] '

// tags are available without the number methods
test('spoken years are tagged', function (t) {
  const yes = [
    ['twenty twenty-six', 3],
    ['twenty twenty six', 3],
    ['twenty ten', 2],
    ['twenty forty', 2],
    ['the Twenty Thirty budget', 2],
    ['in Twenty Twenty-Six', 3],
  ]
  yes.forEach(([str, len]) => {
    const m = nlp(str).match('(#Year && #Cardinal && #TextValue && #Date)')
    t.equal(m.length, len, here + str)
  })
  const no = ['twenty nine', 'twenty fifty', 'twenty eighty two', 'twenty forty one', 'twenty ten miles', 'at twenty thirty']
  no.forEach(str => {
    t.notOk(nlp(str).has('#Year'), here + `no #Year: '${str}'`)
  })
  // these neighbours are unaffected
  t.ok(nlp('the twenty twenty-six budget').has('#Determiner #Year+ #Noun'), here + 'budget is a noun')
  t.end()
})
