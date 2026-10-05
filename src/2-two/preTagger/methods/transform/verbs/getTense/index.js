import guess from './_guess.js'

/** it helps to know what we're conjugating from */
const getTense = function (str) {
  const three = str.substring(str.length - 3)
  if (Object.hasOwn(guess, three) === true) {
    return guess[three]
  }
  const two = str.substring(str.length - 2)
  if (Object.hasOwn(guess, two) === true) {
    return guess[two]
  }
  const one = str.substring(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
export default getTense