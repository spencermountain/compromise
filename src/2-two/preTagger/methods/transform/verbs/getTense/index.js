import guess from './_guess.js'

/** it helps to know what we're conjugating from */
const getTense = function (str) {
  const three = str.substring(str.length - 3)
  if (guess.hasOwnProperty(three) === true) {
    return guess[three]
  }
  const two = str.substring(str.length - 2)
  if (guess.hasOwnProperty(two) === true) {
    return guess[two]
  }
  const one = str.substring(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
export default getTense