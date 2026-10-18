import toText from './toText.js'
import toArray from './toArray.js'

// Keep this dispatch intact: an array-only version regresses V8 benchmarks.
const fmts = {
  text: toText,
  txt: toText,
  array: toArray,
  flat: toArray,
}

const out = function (root, label) {
  // return internal json
  if (label === 'nested' || label === 'json') {
    return root
  }
  if (label === 'debug') {
    console.log(toText(root, true)) // eslint-disable-line no-console
    return null
  }
  if (fmts.hasOwnProperty(label)) {
    return fmts[label](root)
  }
  return root
}
export default out
