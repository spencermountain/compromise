import words from './data.js'

//prevent things like 'fifteen ten', and 'five sixty'
const isValid = (w, has) => {
  if (Object.hasOwn(words.ones, w)) {
    if (has.ones || has.teens) {
      return false
    }
  } else if (Object.hasOwn(words.teens, w)) {
    if (has.ones || has.teens || has.tens) {
      return false
    }
  } else if (Object.hasOwn(words.tens, w)) {
    if (has.ones || has.teens || has.tens) {
      return false
    }
  }
  return true
}
export default isValid
