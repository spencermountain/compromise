import parse from './parse/index.js'
import format from './format/index.js'
import agree from './agree.js'
import { Ord, Card } from '../../../2-two/preTagger/tagSet/_lib.js'

// Keep conversion skips and format choices specific to each public method.
const convert = (view, tag, skip, getFormat) => {
  const res = view._mapNumbers(val => {
    if (skip(val)) {
      return val
    }
    const obj = parse(val)
    if (obj.num === null) {
      return val
    }
    const str = format(obj, getFormat(val))
    val.replaceWith(str, { tags: true, possessives: true })
    // Generated currency words keep their noun tags.
    val.not('#Currency').tag(tag)
    if (tag === Ord || tag === Card) {
      agree(val, tag === Ord || obj.num === 1)
    }
    return val
  })
  return view.update(res.pointer)
}

export default convert
