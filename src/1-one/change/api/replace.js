const dollarStub = /\$[0-9a-z]+/g
const fns = {}

// case logic
const isTitleCase = str => /^\p{Lu}[\p{Ll}'’]/u.test(str) || /^\p{Lu}$/u.test(str)
const toTitleCase = str => str.replace(/^\p{Ll}/u, x => x.toUpperCase())
const toLowerCase = str => str.replace(/^\p{Lu}/u, x => x.toLowerCase())

// doc.replace('foo', (m)=>{})
const replaceByFn = function (main, fn, keep) {
  const ptrs = []
  main.forEach((m, i) => {
    const out = m.replaceWith(fn(m, i), keep)
    ptrs.push(...out.fullPointer)
  })
  // a full document needs no new pointer
  if (main.ptrs) {
    main.ptrs = ptrs
  }
  return main
}

// support 'foo $0' replacements, using this match's own groups
const subDollarSign = function (input, main, [n, start, end]) {
  const groups = main._groups
  return input.replace(dollarStub, a => {
    const name = a.replace(/\$/, '')
    const ptrs = Object.hasOwn(groups, name) ? groups[name] : []
    const found = ptrs.find(ptr => ptr[0] === n && ptr[1] >= start && ptr[2] <= end)
    if (found) {
      // any end-punctuation will be moved over from the original
      return main.update([found]).text({ keepEndPunct: false })
    }
    return a
  })
}

// remember each match, before we change it
const getOriginal = function (terms) {
  const last = terms.at(-1)
  return {
    pre: terms[0].pre,
    post: last.post,
    isTitleCase: isTitleCase(terms[0].text),
    isPossessive: last.tags.has('Possessive'),
    tags: terms.map(term => Array.from(term.tags)),
  }
}

// keep any punctuation, and "John's"
const restoreOriginal = function (terms, original, keep) {
  const last = terms.at(-1)
  if (keep.possessives && original.isPossessive && !last.tags.has('Possessive')) {
    last.text += "'s"
    last.normal += "'s"
    last.tags.add('Possessive')
  }
  // try to keep some pre-punctuation
  if (original.pre) {
    terms[0].pre = original.pre
  }
  // try to keep any post-punctuation
  if (original.post) {
    // the punctuation may have moved here without its spaces - ' - '
    const post = last.post.trim()
    if (!post || post === original.post.trim()) {
      last.post = original.post
    }
  }
}

fns.replaceWith = function (input, keep = {}) {
  // support keep-all option
  if (keep === true) {
    keep = {
      tags: true,
      case: true,
      possessives: true,
    }
  }
  const main = this
  this.uncache()
  if (!main.found) {
    return main
  }
  if (typeof input === 'function') {
    return replaceByFn(main, input, keep)
  }
  // each match has its own '$0' text
  if (typeof input === 'string' && input.includes('$') && Object.keys(main._groups).length > 0) {
    const strs = main.fullPointer.map(ptr => subDollarSign(input, main, ptr))
    return replaceByFn(main, (_m, i) => strs[i], keep)
  }
  const originals = main.docs.map(getOriginal)
  // Preserve old Term identities for plugins before insertion/deletion changes the view.
  const replacements =
    this.world.methods.one.onReplace &&
    this.fullPointer.map(([n, start, end]) => ({
      sentence: this.document[n],
      before: new Set(this.document[n]),
      oldTerms: this.document[n].slice(start, end),
    }))
  const original = this.update(this.fullPointer)
  // slide this in
  if (typeof input === 'string') {
    input = this.fromText(input).compute('id')
  }
  main.insertAfter(input)
  // New terms follow each old match; stop at an existing term to separate nearby matches.
  if (replacements) {
    replacements.forEach(group => {
      const start = group.sentence.indexOf(group.oldTerms.at(-1)) + 1
      group.newTerms = []
      for (let i = start; i < group.sentence.length && !group.before.has(group.sentence[i]); i += 1) {
        group.newTerms.push(group.sentence[i])
      }
    })
  }
  // are we replacing part of a contraction?
  if (original.has('@hasContraction') && main.contractions) {
    const more = main.grow('@hasContraction+')
    more.contractions().expand()
  }
  // delete the original terms
  main.delete(original) //science.

  // main now points at only the new terms
  main.docs.forEach((terms, i) => restoreOriginal(terms, originals[i], keep))

  // what should we return?
  const m = main.toView().compute(['index', 'freeze', 'lexicon'])
  if (m.world.compute.preTagger) {
    m.compute('preTagger')
  }
  m.compute('unfreeze')
  // replace any old tags
  if (keep.tags) {
    m.forEach((match, i) => {
      match.terms().forEach((term, k) => term.tagSafe(originals[i].tags[k]))
    })
  }
  // try to co-erce case, too
  if (keep.case) {
    m.docs.forEach((terms, i) => {
      const transformCase = originals[i].isTitleCase ? toTitleCase : toLowerCase
      terms[0].text = transformCase(terms[0].text)
    })
  }
  // Transfer plugin metadata after replacement text, punctuation, and case are finalized.
  if (m.world.methods.one.onReplace) {
    replacements.forEach(({ oldTerms, newTerms }) => {
      m.world.methods.one.onReplace.forEach(fn => fn({ oldTerms, newTerms, document: m.document }))
    })
  }
  return m
}

fns.replace = function (match, input, keep) {
  if (match && !input) {
    return this.replaceWith(match, keep)
  }
  const m = this.match(match)
  if (!m.found) {
    return this
  }
  this.soften()
  return m.replaceWith(input, keep)
}
export default fns
