import guess from './_guess.js'
import { Pres } from '../../../../tagSet/_lib.js'

/** it helps to know what we're conjugating from */
const getTense = function (str) {
  // try the last three letters, then two
  for (const n of [3, 2]) {
    const end = str.substring(str.length - n)
    if (Object.hasOwn(guess, end)) {
      return guess[end]
    }
  }
  if (str.endsWith('s')) {
    return Pres
  }
  return null
}
export default getTense
