const test = require('tape')
const nlp = require('./_lib')

const subsets = [
  'abbreviations',
  'acronyms',
  'clauses',
  'contractions',
  'lists',
  'nouns',
  'parentheses',
  'possessives',
  'quotations',
  'verbs',
  'people',
  'terms',
  'hyphenated',
  'adjectives',
  'hashTags',
  'emails',
  'emoji',
  'emoticons',
  'atMentions',
  'urls',
  'adverbs',
  'pronouns',
  'conjunctions',
  'prepositions',
  'sentences',
  'phoneNumbers',
  'places',
  'organizations',
  'entities',
]

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

test('try all json methods', function (t) {
  let str = `
  
  .
  ...
  ëii🙏11+ +==\`.
  one one one one one one. two.
  null constructor class ()*.
  ## @ 00~/.
  aaaaaaaaaasaaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaaasaaaaaaaaaáaaaaaaaaaaaasaaaaaaaaaaa. ..
buffalo buffalo seem seem seem really.

URGENT: ➔➔*.
................................................................................................................
................................................................................................................+
-0.0#  .`
  let doc = nlp(str)
  subsets.forEach(sub => {
    let m = doc[sub]()
    let arr = m.json()
    m.tag('H*a--ar.d')
    m.tag('prototype')
    m.tag('null')
    m.unTag('null')
    m = m.match('*')
    m = m.trim()
    t.equal(isArray(arr), true, sub + '.json()')
    t.equal(typeof m.text(), 'string', sub + '.text()')
    t.equal(typeof m.parent().wordCount(), 'number', sub + '.wordcount()')
    t.equal(typeof m.replaceWith('!').text(), 'string', 'replaceWith')
    m = m.map(d => d.if('.'))
    m = m.terms().parent()
    m.cache()
    t.equal(typeof m.text(), 'string', sub + 'after-map')
    t.equal(isArray(arr), true, sub + '.json() again')
  })

  t.end()
})
