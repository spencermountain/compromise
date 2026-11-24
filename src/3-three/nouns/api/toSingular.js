import { Sing } from '../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../_lib.js'
import { matchCase, setChunk, isFixed } from './_lib.js'
import { addArticle, needsArticle } from './_article.js'
import fixVerb from './_verb.js'

const nounToSingular = function (m, parsed, opts = {}) {
  // already singular?
  if (!parsed.isPlural || isFixed(parsed.root)) {
    return m
  }
  const { methods, model } = m.world
  const { toSingular } = methods.two.transform.noun
  // inflect the root noun
  const str = parsed.root.text('normal')
  const single = toSingular(str, model)
  // nothing to do - 'sheep'
  if (single === str) {
    return m
  }
  // decide this before the phrase is changed
  const agree = opts.agreement !== false
  const bare = agree && needsArticle(m, parsed)
  // 'dogs bark' -> 'dog barks' (before our own words move)
  if (agree) {
    fixVerb(m, parsed, false)
  }
  const before = (parsed.root.docs[0] || []).map(term => term.text)
  const after = m.replace(parsed.root, single, keep).tag(Sing, 'toSingular')
  setChunk(after)
  // the conversion works on the normalized text, so put the original case back
  const terms = after.docs[0] || []
  if (terms.length === before.length) {
    terms.forEach((term, i) => {
      term.text = matchCase(before[i], term.text)
    })
  }
  // 'sells seashells' -> 'sells a seashell'
  if (bare) {
    return addArticle(m)
  }
  return m
}
export default nounToSingular
