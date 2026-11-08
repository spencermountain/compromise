import findMain from './mainClause.js'
import { Past, Fut, Pres } from '../../../2-two/preTagger/tagSet/_lib.js'

const grammar = vb => ({
  tense: [Past, Fut, Pres].find(t => vb.has('#' + t)) || null,
})

const parse = function (s) {
  const clauses = s.clauses()
  const main = findMain(clauses)
  let chunks = main.chunks()
  let subj = s.none()
  let verb = s.none()
  let pred = s.none()
  // a relative clause right after the subject has a verb of its own
  // ('the boy who you saw at the store committed a robbery')
  const relativeSubject =
    chunks.length > 2 &&
    !chunks.eq(0).has('<Verb>') &&
    chunks.eq(1).has('^(who|whom|whose|which|that)$')
  if (relativeSubject) {
    // Adjacent finite predicates can share a chunk: 'that barks does not sleep'.
    chunks = chunks.splitAfter('[(#Pres && !#Aux && !#Cop && !#Inf)] #Verb', 0)
  }
  const relative = relativeSubject && chunks.filter(ch => ch.has('<Verb>')).length > 1
  let isSkipped = false
  chunks.forEach((ch, i) => {
    if (i === 0 && !ch.has('<Verb>')) {
      subj = ch
      return
    }
    if (!verb.found && ch.has('<Verb>')) {
      if (relative && !isSkipped) {
        isSkipped = true
        return
      }
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
    pred,
    grammar: grammar(verb),
  }
}
export default parse
