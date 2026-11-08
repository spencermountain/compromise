import { resolveTag } from '../methods/_lib.js'
import eachTerm from '../../tokenize/compute/_lib.js'

// shared guards - returns the terms to change, or null
const prep = function (view, input) {
  if (!view.found || !input) {
    return null
  }
  const terms = view.termList()
  if (terms.length === 0) {
    return null
  }
  return terms
}

const fns = {
  /** add a given tag, to all these terms */
  tag: function (input, reason = '', isSafe) {
    const terms = prep(this, input)
    if (terms) {
      this.methods.one.setTag(terms, input, this.world, isSafe, reason)
      this.uncache()
    }
    return this
  },

  /** add a given tag, only if it is consistent */
  tagSafe: function (input, reason = '') {
    return this.tag(input, reason, true)
  },

  /** remove a given tag from all these terms */
  unTag: function (input, reason) {
    const terms = prep(this, input)
    if (terms) {
      const { methods, model } = this
      const { tagSet, tagAliases } = model.one
      const list = Array.isArray(input) ? input : [input]
      list.forEach(tag => methods.one.unTag(terms, resolveTag(tag.trim(), tagAliases), tagSet, reason))
      this.uncache()
    }
    return this
  },

  /** return only the terms that can be this tag  */
  canBe: function (tag) {
    const { tagSet, tagAliases } = this.model.one
    tag = resolveTag(tag, tagAliases)
    const canBe = this.methods.one.canBe
    const nope = []
    eachTerm(this.document, (term, terms, i, n) => {
      if (!canBe(term, tag, tagSet)) {
        nope.push([n, i, i + 1])
      }
    })
    const noDoc = this.update(nope)
    return this.difference(noDoc)
  },
}
export default fns
