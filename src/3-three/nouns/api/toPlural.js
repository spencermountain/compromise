import hasPlural from './hasPlural.js'
import { Plur } from '../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../_lib.js'
import { matchCase, setChunk, isFixed } from './_lib.js'
import { removeArticle } from './_article.js'
import fixVerb from './_verb.js'

const nounToPlural = function (m, parsed, opts = {}) {
  // already plural, or is a plural not appropriate?
  if (parsed.isPlural || isFixed(parsed.root) || !hasPlural(parsed.root)) {
    return m
  }
  const { methods, model } = m.world
  const { toPlural } = methods.two.transform.noun
  // inflect the root noun
  const str = parsed.root.text({ keepPunct: false })
  let plural = toPlural(str, model)
  // 'MOUSE' -> 'MICE'
  if (str === str.toUpperCase()) {
    plural = matchCase(str, toPlural(str.toLowerCase(), model))
  }
  // nothing to do - 'sheep'
  if (plural === str) {
    return m
  }
  const agree = opts.agree !== false
  // 'dog barks' -> 'dogs bark' (before our own words move)
  if (agree) {
    fixVerb(m, parsed, true)
  }
  const after = m.match(parsed.root).replaceWith(plural, keep).tag(Plur, 'toPlural')
  setChunk(after)
  // 'a captain' -> 'captains'
  if (agree) {
    return removeArticle(m)
  }
  return m
}
export default nounToPlural
