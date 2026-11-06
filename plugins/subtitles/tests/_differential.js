// run every method on one big doc, and on a WrapDoc of the same text, then compare.
// methods are discovered at runtime, so new ones are covered without changes here.
import WrapDoc from '../src/WrapDoc.js'

// cues split on sentence boundaries, so that tagging is the same in both
const cues = [
  "John walked to the big store. He didn't buy 3 red apples.",
  'Oh wow!',
  "Tom's dog is quickly eating 20 treats. Mary sold two old cars and a third of her toys in Toronto for $50.",
  'Do the walls really need 5 coats of paint?',
  "the new york yankees won 3 games. Dr. Smith wasn't happy about two thirds of it (again).",
]

// selections with their own subclass of methods
const selections = [
  'verbs',
  'nouns',
  'adjectives',
  'adverbs',
  'numbers',
  'sentences',
  'people',
  'contractions',
  'possessives',
  'fractions',
  'money',
  'percentages',
  'quotations',
  'parentheses',
  'acronyms',
  'pronouns',
  'chunks',
  'clauses',
]

// params for anything that needs them
const params = {
  after: ['the'],
  and: ['#Noun'],
  append: ['foo'],
  before: ['the'],
  canBe: ['Noun'],
  compute: ['normal'],
  concat: ['foo bar.'],
  difference: ['#Noun'],
  filter: [m => m.has('#Noun')],
  find: [m => m.has('#Verb')],
  forEach: [() => {}],
  grow: ['#Adjective'],
  growLeft: ['#Adjective'],
  growRight: ['#Noun'],
  has: ['#Verb'],
  html: [{ '#Noun': 'b' }],
  if: ['#Verb'],
  ifNo: ['#Verb'],
  insert: ['foo'],
  insertAfter: ['foo'],
  insertBefore: ['foo'],
  intersection: ['#Noun'],
  isEqual: [3],
  join: [],
  lookAfter: ['.'],
  lookAhead: ['.'],
  lookBefore: ['.'],
  lookBehind: ['.'],
  lookup: [['walked', 'cars']],
  map: [m => m.text()],
  match: ['#Noun'],
  matchOne: ['#Noun'],
  not: ['#Noun'],
  notIf: ['#Noun'],
  prepend: ['foo'],
  replace: ['#Adjective', 'foo'],
  replaceWith: ['foo'],
  some: [m => m.has('wow')],
  splitAfter: ['#Noun'],
  splitBefore: ['#Noun'],
  splitOn: ['#Noun'],
  swap: ['cars', 'trucks'],
  tag: ['Foo'],
  tagSafe: ['Noun'],
  unTag: ['Noun'],
  union: ['#Noun'],
  wrap: [{ '#Noun': () => '<n>' }],
  add: [2],
  subtract: [2],
  plus: [2],
  minus: [2],
  set: [7],
  between: [1, 10],
  isBetween: [1, 10],
  greaterThan: [4],
  lessThan: [4],
  equals: [3],
  isUnit: ['coats'],
}

// known differences from a single doc, and why
const expected = {
  // order is only changed within each cue, so that they stay in time-order
  '.sort()': 'gap',
  '.reverse()': 'gap',
  '.reverse(1)': 'gap',
  // core's .topics() order comes from concat(), which starts over in each cue
  '.topics()': 'gap',
  // core decides to keep end-punctuation from the first match, so here that's per-cue
  '.nouns().text()': 'gap',
  '.nouns().text(1)': 'gap',
  '.adverbs().text()': 'gap',
  '.adverbs().text(1)': 'gap',
  '.numbers().text()': 'gap',
  '.numbers().text(1)': 'gap',
  // core only returns a view in some paths. the document ends up the same
  '.swap(cars, trucks)': 'core',
  // core keeps a possessive based on the first match only, so "Tom's" loses its 's in a single doc
  '.redact()': 'core',
  '.redact(1)': 'core',
  // core bug in a single doc: a question makes the next sentence "is not not happy"
  '.verbs().toInfinitive()': 'core',
  '.verbs().toFutureTense()': 'core',
  '.verbs().toFuture()': 'core',
  '.verbs().toGerund()': 'core',
  '.verbs().toPastParticiple()': 'core',
  '.sentences().toInfinitive()': 'core',
  '.sentences().toFutureTense()': 'core',
  '.sentences().toFuture()': 'core',
}

// not run at all, and why
const skip = new Set([
  // random
  'random',
  // low-level pointers don't mean anything across docs
  'update',
  'toView',
  'cache',
  'uncache',
  // parses new text, rather than reading the doc
  'fromText',
  // prints to the console
  'debug',
  // a read of the first term, in a single doc
  'pre',
  'post',
  // needs the plugin's prefix-tree format
  'sweep',
  // ids and per-sentence indexes are different, by design
  'data',
])

const methodsOf = function (obj) {
  const names = new Set()
  let proto = Object.getPrototypeOf(obj)
  while (proto && proto !== Object.prototype) {
    Object.getOwnPropertyNames(proto).forEach(k => {
      const desc = Object.getOwnPropertyDescriptor(proto, k)
      if (typeof desc.value === 'function' && k !== 'constructor') {
        names.add(k)
      }
    })
    proto = Object.getPrototypeOf(proto)
  }
  return [...names].filter(k => !skip.has(k) && !k.startsWith('_'))
}

// reduce any result to something comparable
const simple = function (val) {
  if (val?.isView) {
    return val.out('array')
  }
  if (Array.isArray(val)) {
    return val.map(simple)
  }
  if (val && typeof val === 'object') {
    const res = {}
    Object.keys(val).forEach(k => {
      // these all restart with each doc
      if (!['id', 'index', 'offset', 'dirty', 'chunk'].includes(k)) {
        res[k] = simple(val[k])
      }
    })
    // a cue has no space after its last word
    if (typeof res.post === 'string') {
      res.post = res.post.trimEnd()
    }
    return res
  }
  return val
}

const attempt = function (fn) {
  try {
    return { result: JSON.stringify(simple(fn())) }
  } catch (e) {
    return { threw: e.message }
  }
}

// compare one method call, on fresh docs
const compare = function (nlp, sel, name, args) {
  const select = doc => (sel ? doc[sel]() : doc)
  const plain = nlp(cues.join(' '))
  const wrap = new WrapDoc(cues.map(str => nlp(str)))
  const a = attempt(() => select(plain)[name](...args))
  const b = attempt(() => select(wrap)[name](...args))
  return {
    id: `${sel ? `.${sel}()` : ''}.${name}(${args.map(String).join(', ')})`,
    plain: a,
    wrap: b,
    // transforms must also leave the same document behind
    plainText: plain.text(),
    wrapText: wrap.text(),
  }
}

// every method: as given, and with an `n` param
const allCases = function (nlp) {
  const cases = []
  const add = (sel, names) => {
    names.forEach(name => {
      if (Object.hasOwn(params, name)) {
        cases.push([sel, name, params[name]])
      } else {
        cases.push([sel, name, []], [sel, name, [1]])
      }
    })
  }
  const base = methodsOf(nlp(''))
  add(null, base)
  selections.forEach(sel => {
    add(sel, methodsOf(nlp('')[sel]()).filter(k => !base.includes(k)))
    // the selection itself, plus some common things after it
    add(sel, ['text', 'first', 'last'])
  })
  // a value of 0 must not be mistaken for a position
  cases.push(
    ['numbers', 'greaterThan', [0]],
    ['numbers', 'lessThan', [0]],
    ['numbers', 'isEqual', [0]],
    ['numbers', 'between', [-1, 0]],
    ['numbers', 'add', [0]],
    ['numbers', 'set', [0]],
  )
  return cases
}

const isSame = function (res) {
  // both threw is fine: the wrapper isn't responsible for a param that doesn't apply
  if (res.plain.threw && res.wrap.threw) {
    return true
  }
  return res.plain.result === res.wrap.result && res.plainText === res.wrapText
}

export { compare, allCases, isSame, expected }
