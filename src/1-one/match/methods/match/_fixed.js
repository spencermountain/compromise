import fromHere from './02-from-here.js'
import matchTerm from './term/doesMatch.js'

// Compiled sweeps cache this check; editable public patterns are rechecked.
const isFixed = regs => regs.every(reg => !reg.optional && !reg.greedy &&
  !reg.negative && !reg.choices && !reg.anything &&
  (reg.word !== undefined || reg.tag !== undefined || reg.switch !== undefined || reg.fastOr !== undefined))

const fromFixed = (terms, regs, start, length, offset = 0) => {
  if (offset + regs.length > terms.length) {
    return null
  }
  for (let r = 0; r < regs.length; r += 1) {
    const term = terms[offset + r]
    // A literal contraction can consume more than one term.
    if (term.implicit) {
      return fromHere(terms, regs, start, length, offset)
    }
    if (matchTerm(term, regs[r], start + r, length) !== true) {
      return null
    }
  }
  // Failed attempts never need capture state.
  const groups = {}
  for (let r = 0; r < regs.length; r += 1) {
    const name = regs[r].group
    if (name) {
      if (!groups[name]) {
        groups[name] = [null, start + r, start + r]
      }
      groups[name][2] += 1
    }
  }
  return { pointer: [null, start, start + regs.length], groups }
}

export { isFixed, fromFixed }
