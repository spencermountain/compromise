import test from 'tape'
import nlp from './_lib.js'
const here = '[three/fuzz] '


const subsets = [
  'abbreviations',
  'acronyms',
  'clauses',
  'contractions',
  // 'lists',
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
  'topics',
  'numbers',
  'fractions',
  // 'money',
]

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}


const goodIds = function (doc) {
  const all = {}
  doc.docs.forEach(terms => {
    terms.forEach(term => {
      if (!term.id || all[term.id] === true) {
        return
      }
      all[term.id] = true
    })
  })
  return true
}


test('try all json methods', function (t) {
  const str = `
  
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
  const doc = nlp(str)
  subsets.forEach(sub => {
    t.ok(doc[sub], here + sub)
    let m = doc[sub]()
    const arr = m.json()
    m.tag('H*a--ar.d')
    m.tag('prototype')
    m.tag('null')
    m.unTag('null')
    m = m.match('*')
    m.replace('. [@hasPeriod]', 'blug.')
    m.contractions().expand()
    m.append('.3')
    m = m.trim()
    t.equal(isArray(arr), true, sub + '.json()')
    t.equal(typeof m.text(), 'string', sub + '.text()')
    t.equal(typeof m.wordCount(), 'number', sub + '.wordcount()')
    t.equal(typeof m.replaceWith('!').text(), 'string', 'replaceWith')
    m = m.map(d => d.if('.'))
    m = m.terms()
    m.cache()
    t.equal(typeof m.text(), 'string', sub + 'after-map')
    t.equal(isArray(arr), true, sub + '.json() again')
    t.equal(goodIds(m), true, here + sub + 'good-ds')
  })

  t.end()
})
