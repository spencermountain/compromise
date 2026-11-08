import findAffix from '../../../_lib.js'
// swap a known suffix for its replacement
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  const suffix = findAffix(str, suffixes, Math.min(len - 1, 6), 1)
  if (suffix === null) {
    return null
  }
  return str.slice(0, len - suffix.length) + suffixes[suffix.length][suffix]
}
export default suffixLoop
