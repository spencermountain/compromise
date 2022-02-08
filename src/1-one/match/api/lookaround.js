// import { indexN } from '../../pointers/methods/lib/index.js'


const before = function (regs, group) {
  const { indexN } = this.methods.one
  let pre = []
  let byN = indexN(this.fullPointer)
  Object.keys(byN).forEach(k => {
    // check only the earliest match in the sentence
    let first = byN[k].sort((a, b) => (a[1] > b[1] ? 1 : -1))[0]
    if (first[1] > 0) {
      pre.push([first[0], 0, first[1]])
    }
  })
  let preWords = this.toView(pre)
  if (!regs) {
    return preWords
  }
  return preWords.match(regs, group)
}

const after = function (regs, group) {
  const { indexN } = this.methods.one
  let post = []
  let byN = indexN(this.fullPointer)
  let document = this.document
  Object.keys(byN).forEach(k => {
    // check only the latest match in the sentence
    let last = byN[k].sort((a, b) => (a[1] > b[1] ? -1 : 1))[0]
    let [n, , end] = last
    if (end < document[n].length) {
      post.push([n, end, document[n].length])
    }
  })
  let postWords = this.toView(post)
  if (!regs) {
    return postWords
  }
  return postWords.match(regs, group)
}

const growLeft = function (regs, group) {
  regs = this.world.methods.one.parseMatch(regs)
  regs[regs.length - 1].end = true// ensure matches are beside us ←
  let ptrs = this.fullPointer
  this.forEach((m, n) => {
    let more = m.before(regs, group)
    if (more.found) {
      let terms = more.terms()
      ptrs[n][1] -= terms.length
      ptrs[n][3] = terms.docs[0][0].id
    }
  })
  return this.update(ptrs)
}

const growRight = function (regs, group) {
  regs = this.world.methods.one.parseMatch(regs)
  regs[0].start = true// ensure matches are beside us →
  let ptrs = this.fullPointer
  this.forEach((m, n) => {
    let more = m.after(regs, group)
    if (more.found) {
      let terms = more.terms()
      ptrs[n][2] += terms.length
    }
  })
  return this.update(ptrs)
}

const grow = function (regs, group) {
  return this.growRight(regs, group).growLeft(regs, group)
}

export default { before, after, growLeft, growRight, grow }
