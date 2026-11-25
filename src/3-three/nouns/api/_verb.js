import { keepTags as keep, causative } from '../../_lib.js'

// irregular helpers - 'the dog [is]' <-> 'the dogs [are]'
const pairs = [
  ['is', 'are'],
  ['was', 'were'],
  ['has', 'have'],
  ['does', 'do'],
]
const aux = '(is|are|was|were|do|does|have|has)'
// words between a verb and its noun - 'are [not the big] dogs'
const opener = '(not|no|#Det|#Poss|#Adj|#Adv)*'
const adverbs = '(not|never|#Adv)*'
// here, the noun is not doing the next verb - 'let the [dogs] run'
const isObject = causative + '$'
// 'the men who own [dogs] like them'
const inClause = '(who|that|which) #Adv? #Verb$'

// 'the dog [barks]' <-> 'the dogs [bark]'
const regular = function (vb, isPlural) {
  // only the simple present-tense changes
  if (!vb.has('#Pres') || vb.has('(#Modal|#Ger|#Past|#Participle|#Imperative)')) {
    return
  }
  const { toInfinitive, conjugate } = vb.methods.two.transform.verb
  const str = vb.text('normal')
  let want = toInfinitive(str, vb.model, 'PresentTense')
  if (!isPlural) {
    want = conjugate(want, vb.model).PresentTense
  }
  if (want && want !== str) {
    vb.replaceWith(want, keep)
  }
}

// change one verb to suit a singular or plural subject
const agree = function (vb, isPlural) {
  // .has() sees inside a contraction - "isn't"
  const pair = pairs.find(a => vb.has(a[0]) || vb.has(a[1]))
  if (!pair) {
    regular(vb, isPlural)
    return
  }
  const [from, to] = isPlural ? pair : [pair[1], pair[0]]
  if (vb.has(from)) {
    vb.replaceWith(to)
  }
}

// the verb comes first - 'there [are] dogs', '[do] dogs bark?'
const inverted = function (before) {
  const vb = before.match(`(there|here|#QuestionWord) [${aux}] ${opener}$`, 0)
  if (vb.found) {
    return vb
  }
  return before.match(`^[${aux}] ${opener}$`, 0)
}

// the verbs this noun is doing, in order
const findVerbs = function (after) {
  const found = []
  // 'the dogs [that bark] are loud'
  const clause = after.match(`^(that|who|which) ${adverbs} [#Verb]`, 0)
  if (clause.found) {
    found.push(clause)
    after = clause.after()
  }
  // the verb right beside us
  let vb = after.match(`^${clause.found ? '(#Adv|#Adj)*' : adverbs} [#Verb]`, 0)
  // 'the dogs [in the yard] are barking'
  if (!vb.found) {
    vb = after.match(`^#Prep (#Det|#Poss|#Adj|#Val)* #Noun+ ${adverbs} [#Verb]`, 0)
  }
  // 'the cars [he bought] were old'
  if (!vb.found) {
    vb = after.match(`^(i|he|she|we|they|you) #Adv* #Verb [${aux}]`, 0)
  }
  if (vb.found) {
    found.push(vb)
    // 'the dogs bark [and run]'
    const more = vb.after().match('^#Adv* (and|or) (then|#Adv)* [#Verb]', 0)
    if (more.found) {
      found.push(more)
    }
  }
  return found
}

// make the verbs agree with our new noun
const fixVerb = function (m, parsed, isPlural) {
  const before = m.before()
  const first = inverted(before)
  if (first.found) {
    agree(first, isPlural)
    return
  }
  // is this noun the subject of anything?
  if (parsed.isSubordinate || m.has('#Conj') || before.has(isObject) || before.has(inClause)) {
    return
  }
  // last one first, so the others stay where they are
  findVerbs(m.after()).reverse().forEach(vb => agree(vb, isPlural))
}
export default fixVerb
