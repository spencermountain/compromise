import convertAuxiliary from './auxiliary.js'
import { retag } from '../lib.js'

// convert the auxiliary chain, or else use the converter for this grammar form
const byForm = (target, forms, fallback, isDone) => (vb, parsed, form) => {
  const converted = convertAuxiliary(vb, parsed, form, target)
  if (converted) {
    return converted
  }
  if (isDone && isDone(vb)) {
    return vb
  }
  const fn = Object.hasOwn(forms, form) ? forms[form] : fallback
  if (fn) {
    vb = fn(vb, parsed)
    retag(vb)
  }
  return vb
}

export default byForm
