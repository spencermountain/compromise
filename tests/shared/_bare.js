// run in a child process - a tokenize-only build, like the i18n libraries start from
import nlp from '../../src/one.js'
import { lazy, topics, redact, misc, clauses, checkSpec, tagSet } from '../../src/shared/index.js'

const out = { before: typeof nlp('').people, threw: {}, lib: [] }
try {
  nlp.plugin(clauses)
  nlp('one, two (and a three)').clauses()
} catch (e) {
  out.threw.clausesAlone = e.message
}
// clauses goes first, to show it does not need misc
const plugins = { clauses, lazy, topics, redact, misc, checkSpec }
Object.keys(plugins).forEach(k => nlp.plugin(plugins[k]))
out.lib = ['lazy', 'checkSpec', 'assertSpec'].filter(k => typeof nlp[k] === 'function')

// with no tagger these find little, but none should throw
const methods = ['clauses', 'people', 'places', 'organizations', 'topics', 'acronyms', 'parentheses', 'possessives', 'quotations', 'emails', 'redact']
const doc = nlp('Spencer (the F.B.I. guy) walked to "Paris, France".')
methods.forEach(k => {
  try {
    doc[k]()
  } catch (e) {
    out.threw[k] = e.message
  }
})
out.parens = doc.parentheses().out('array')
out.quotes = doc.quotations().out('array')
// the english tagset on a build with no tags
nlp.plugin({ tags: { ...tagSet } })
const tagged = nlp('toronto').tag('City')
out.tags = [tagged.has('#Place'), tagged.has('#Noun'), tagged.has('#NN'), tagged.has('#Verb')]
out.clauses = nlp('before we go; we eat').clauses().out('array')
out.spec = nlp.checkSpec('hello there').map(res => res.status)
console.log(JSON.stringify(out)) // eslint-disable-line no-console
