const before = function (regs, group, opts) {
  const { indexN } = this.methods.one.pointer
  const pre = []
  const byN = indexN(this.fullPointer)
  Object.keys(byN).forEach(k => {
    // check only the earliest match in the sentence
    const first = byN[k].sort((a, b) => (a[1] > b[1] ? 1 : -1))[0]
    if (first[1] > 0) {
      pre.push([first[0], 0, first[1]])
    }
  })
  const preWords = this.toView(pre)
  if (!regs) {
    return preWords
  }
  return preWords.match(regs, group, opts)
}

const after = function (regs, group, opts) {
  const { indexN } = this.methods.one.pointer
  const post = []
  const byN = indexN(this.fullPointer)
  const document = this.document
  Object.keys(byN).forEach(k => {
    // check only the latest match in the sentence
    const last = byN[k].sort((a, b) => (a[1] > b[1] ? -1 : 1))[0]
    const [n, , end] = last
    if (end < document[n].length) {
      post.push([n, end, document[n].length])
    }
  })
  const postWords = this.toView(post)
  if (!regs) {
    return postWords
  }
  return postWords.match(regs, group, opts)
}

const growLeft = function (regs, group, opts) {
  if (typeof regs === 'string') {
    regs = this.world.methods.one.parseMatch(regs, opts, this.world)
  }
  regs[regs.length - 1].end = true // ensure matches are beside us ←
  const ptrs = this.fullPointer
  this.forEach((m, n) => {
    const more = m.before(regs, group)
    if (more.found) {
      const terms = more.terms()
      ptrs[n][1] -= terms.length
      ptrs[n][3] = terms.docs[0][0].id
    }
  })
  return this.update(ptrs)
}

const growRight = function (regs, group, opts) {
  if (typeof regs === 'string') {
    regs = this.world.methods.one.parseMatch(regs, opts, this.world)
  }
  regs[0].start = true // ensure matches are beside us →
  const ptrs = this.fullPointer
  this.forEach((m, n) => {
    const more = m.after(regs, group)
    if (more.found) {
      const terms = more.terms()
      ptrs[n][2] += terms.length
      ptrs[n][4] = null //remove end-id
    }
  })
  return this.update(ptrs)
}

const grow = function (regs, group, opts) {
  return this.growRight(regs, group, opts).growLeft(regs, group, opts)
}

export default { before, after, growLeft, growRight, grow }
