import { Plur } from '../../preTagger/tagSet/_lib.js'

// "there's cats" is [there, are] - the first pass chose 'is', before the plural was tagged
const thereAre = function (terms, i) {
  const term = terms[i]
  if (term.normal !== `there's` || term.implicit !== 'there') {
    return false
  }
  const is = terms[i + 1]
  const next = terms[i + 2]
  if (!is || is.implicit !== 'is' || !next || !next.tags.has(Plur)) {
    return false
  }
  is.implicit = 'are'
  is.machine = 'are'
  return true
}
export default thereAre
