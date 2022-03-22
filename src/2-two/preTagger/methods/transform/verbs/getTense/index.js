import guess from './_guess.js'

/** it helps to know what we're conjugating from */
const getTense = function (str) {
  let three = str.substr(str.length - 3)
  if (guess.hasOwnProperty(three) === true) {
    return guess[three]
  }
  let two = str.substr(str.length - 2)
  if (guess.hasOwnProperty(two) === true) {
    return guess[two]
  }
  let one = str.substr(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
export default getTense