import findMain from './mainClause.js'

const parse = function (s) {
  let clause = findMain(s)
  let chunks = clause.chunks()
  let subj = s.none()
  let verb = s.none()
  let obj = s.none()
  chunks.forEach((ch, i) => {
    if (i === 0) {
      subj = ch
      return
    }
    if (!verb.found && ch.has('<Verb>')) {
      verb = ch
      return
    }
    if (verb.found) {
      obj = obj.concat(ch)
    }
  })
  return {
    subj,
    verb,
    obj
  }
}
export default parse