import { Sing } from '../../tagSet/_lib.js'

// setTag without a safe-list of tags to keep
const setTag = (terms, tag, world, reason) => world.methods.one.setTag(terms, tag, world, null, reason)

// 'Comfort', "O'Brien"
const titleCase = /^\p{Lu}[\p{Ll}'’]/u

// allow anything titlecased - but only tag a titlecased first-word, if it checks-out
const isTitleWord = (term, i, yelling) => {
  if (yelling || !titleCase.test(term.text)) {
    return false
  }
  if (i === 0) {
    return term.tags.has(Sing)
  }
  return true
}

export { setTag, titleCase, isTitleWord }
