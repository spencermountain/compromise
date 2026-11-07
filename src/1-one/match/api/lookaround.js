// the words before (or after) each match, in its sentence
const lookaround = function (view, isAfter, regs, group, opts) {
  const { indexN } = view.methods.one.pointer
  const { document } = view
  const dir = isAfter ? -1 : 1
  const ptrs = []
  const byN = indexN(view.fullPointer)
  Object.keys(byN).forEach(k => {
    // check only the earliest (or latest) match in the sentence
    const [n, start, end] = byN[k].sort((a, b) => (a[1] > b[1] ? dir : -dir))[0]
    if (isAfter) {
      if (end < document[n].length) {
        ptrs.push([n, end, document[n].length])
      }
    } else if (start > 0) {
      ptrs.push([n, 0, start])
    }
  })
  const words = view.toView(ptrs)
  if (!regs) {
    return words
  }
  return words.match(regs, group, opts)
}

const before = function (regs, group, opts) {
  return lookaround(this, false, regs, group, opts)
}

const after = function (regs, group, opts) {
  return lookaround(this, true, regs, group, opts)
}

// extend each match left (or right), while the terms beside it match
const growSide = function (view, isRight, regs, group, opts) {
  if (typeof regs === 'string') {
    regs = view.world.methods.one.parseMatch(regs, opts, view.world)
  }
  // ensure matches are beside us
  if (isRight) {
    regs[0].start = true
  } else {
    regs[regs.length - 1].end = true
  }
  const ptrs = view.fullPointer
  view.forEach((m, n) => {
    const more = isRight ? m.after(regs, group) : m.before(regs, group)
    if (more.found) {
      const terms = more.terms()
      if (isRight) {
        ptrs[n][2] += terms.length
        ptrs[n][4] = null //remove end-id
      } else {
        ptrs[n][1] -= terms.length
        ptrs[n][3] = terms.docs[0][0].id
      }
    }
  })
  return view.update(ptrs)
}

const growLeft = function (regs, group, opts) {
  return growSide(this, false, regs, group, opts)
}

const growRight = function (regs, group, opts) {
  return growSide(this, true, regs, group, opts)
}

const grow = function (regs, group, opts) {
  return this.growRight(regs, group, opts).growLeft(regs, group, opts)
}

export default { before, after, growLeft, growRight, grow }
