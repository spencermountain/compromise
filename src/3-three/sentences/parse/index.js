import findMain from './mainClause.js'

const parse = function (s) {
  let clauses = s.clauses()
  let main = findMain(clauses)
  let chunks = main.chunks()
  let subj = s.none()
  let verb = s.none()
  let pred = s.none()
  chunks.forEach((ch, i) => {
    if (i === 0 && !ch.has('<Verb>')) {
      subj = ch
      return
    }
    if (!verb.found && ch.has('<Verb>')) {
      verb = ch
      return
    }
    if (verb.found) {
      pred = pred.concat(ch)
    }
  })
  // cleanup a missed parse
  if (verb.found && !subj.found) {
    subj = verb.before('<Noun>+').first()
  }
  return {
    subj,
    verb,
    pred
  }
}
export default parse