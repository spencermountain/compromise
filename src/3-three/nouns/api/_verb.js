import { keepTags as keep } from '../../_lib.js'

// irregular helpers - 'the dog [is]' <-> 'the dogs [are]'
const pairs = [
  ['is', 'are'],
  ['was', 'were'],
  ['has', 'have'],
  ['does', 'do'],
]
// here, the noun is not doing the next verb - 'let the [dogs] run'
const isObject = '(let|lets|make|makes|made|help|helps|helped|see|sees|saw|watch|watched|hear|heard|have|has|had|feel|felt)$'
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

// make the next verb agree with our new noun
const fixVerb = function (m, parsed, isPlural) {
  // is this noun the subject of anything?
  const before = m.before()
  if (parsed.isSubordinate || m.has('#Conj') || before.has(isObject) || before.has(inClause)) {
    return
  }
  // only the verb right beside us
  const vb = m.after().match('^(not|never|#Adv)* [#Verb]', 0)
  if (!vb.found) {
    return
  }
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
export default fixVerb
