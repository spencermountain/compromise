// case logic for the first character of a word
export const isTitleCase = str => /^\p{Lu}[\p{Ll}'’]/u.test(str) || /^\p{Lu}$/u.test(str)
export const toTitleCase = str => str.replace(/^\p{Ll}/u, x => x.toUpperCase())
export const toLowerCase = str => str.replace(/^\p{Lu}/u, x => x.toLowerCase())

// give a new word the case of the one it replaced: 'Danes' -> 'Dane', 'DANES' -> 'DANE'
export const matchCase = (original, str) => {
  if (original.length > 1 && original === original.toUpperCase() && original !== original.toLowerCase()) {
    return str.toUpperCase()
  }
  return /^\p{Lu}/u.test(original) ? toTitleCase(str) : str
}
