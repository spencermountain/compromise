import { hasAny } from '../../_lib.js'
import { NN, Pron, Plur, Sing } from '../../preTagger/tagSet/_lib.js'
const lastNoun = function (terms, i) {
  for (let n = i - 1; n >= 0; n -= 1) {
    if (hasAny(terms[n], NN, Pron, Plur, Sing)) {
      return terms[n]
    }
  }
  return null
}

// ain't -> am/is/are not, from its subject
const apostropheT = function (terms, i) {
  const normal = terms[i].normal
  if (normal === "ain't" || normal === 'aint') {
    const noun = lastNoun(terms, i)
    const str = noun ? noun.normal : ''
    const isPlural = str === 'we' || str === 'they' || str === 'you' || (noun !== null && noun.tags.has(Plur))
    // "he ain't never" -> has never,  "i ain't never" -> have never
    if (terms[i + 1] && terms[i + 1].normal === 'never') {
      if (noun && !isPlural && str !== 'i') {
        return ['has']
      }
      return ['have']
    }
    if (str === 'i') {
      return ['am', 'not']
    }
    if (isPlural) {
      return ['are', 'not']
    }
    return ['is', 'not']
  }
  const before = normal.replace(/n't/, '')
  return [before, 'not']
}

export default apostropheT
