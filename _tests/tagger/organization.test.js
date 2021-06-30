const test = require('tape')
const nlp = require('../_lib')

test('organization test', function (t) {
  const arr = [
    'google',
    'google inc',
    'Capital One',
    'HSBC',
    'NASA',
    // '7-eleven',
    'al qaeda',
    'FBI',
    'monsanto',
    'Johnson & Johnson',
    // 'Johnson & Johnson LLC',
  ]
  arr.forEach(function (str) {
    const r = nlp(str)
    const orgs = r.match('#Organization+')
    const msg = orgs.out('text') + '  -  ' + str
    t.equal(orgs.out('text'), str, msg)
  })
  t.end()
})
