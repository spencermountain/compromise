import words from './data.js'

//prevent things like 'fifteen ten', and 'five sixty'
const isValid = (w, has) => {
  if (Object.hasOwn(words.small, w)) {
    if (has.ones || has.teens) {
      return false
    }
    // a ones-word may follow a tens-word: 'sixty five'
    if (has.tens && !Object.hasOwn(words.ones, w)) {
      return false
    }
  }
  return true
}
export default isValid
