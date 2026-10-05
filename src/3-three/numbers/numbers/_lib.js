import parse from './parse/index.js'
import format from './format/index.js'

// Keep conversion skips and format choices specific to each public method.
const convert = (view, Numbers, tag, skip, getFormat) => {
  const res = view.map(val => {
    if (skip(val)) {
      return val
    }
    const obj = parse(val)
    if (obj.num === null) {
      return val
    }
    const str = format(obj, getFormat(val))
    val.replaceWith(str, { tags: true })
    val.tag(tag)
    return val
  })
  return new Numbers(res.document, res.pointer)
}

export default convert
