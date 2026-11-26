import { isTitleCase, toTitleCase, toLowerCase } from './_case.js'

// Heal the edges of a sentence, when its first or last words change.
// Shared by insert and remove, and by the noun and verb conversions.

// a capital of its own, not the sentence's - 'Spencer', 'NASA', 'I', or 'Plan B'
const ownsCapital = function (term) {
  if (term.tags.has('ProperNoun') || term.tags.has('Acronym')) {
    return true
  }
  return term.text.length === 1 || !isTitleCase(term.text)
}

// the first word of a sentence lends its capital to a new first word
const passCapital = function (from, to, drop) {
  if (!/^\p{Lu}/u.test(from.text)) {
    return
  }
  to.text = toTitleCase(to.text)
  if (drop && !ownsCapital(from)) {
    from.text = toLowerCase(from.text)
  }
}

// quotes, brackets and newlines open a phrase, so they stay in front of it
const passOpening = function (from, to) {
  to.pre = from.pre + to.pre
  from.pre = ''
}

// a bare hyphen joins two words - 'well-fed'
const isJoiner = post => /^[-–]$/.test(post)

// "dogs' bowls" - with no opening quote before it, an apostrophe belongs to its word
const isPossessive = function (terms, i) {
  if (!/^['’]/.test(terms[i].post)) {
    return false
  }
  return !terms.slice(0, i + 1).some(term => /['‘]/.test(term.pre))
}

// periods, commas, closing quotes and brackets end a phrase, so they stay behind it
const passClosing = function (terms, i, to) {
  const from = terms[i]
  // nothing to move, or it is part of the word
  if (!from.post || isJoiner(from.post) || isPossessive(terms, i)) {
    return false
  }
  let post = from.post
  // the new words may bring their own ending - 'loudly!'
  if (/[.?!…]/.test(to.post)) {
    post = post.replace(/^[.?!…]+/, '')
  }
  to.post = to.post.trimEnd() + post
  from.post = ' '
  return true
}

export { passCapital, passOpening, passClosing }
