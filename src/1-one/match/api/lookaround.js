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
  let preWords = this.update(pre)
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
  let postWords = this.update(post)
  if (!regs) {
    return postWords
  }
  return postWords.match(regs, group)
}

export default { before, after }
