import parse from './parse/index.js'
import format from './format/index.js'
import agree from './agree.js'

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
    val.replaceWith(str, { tags: true })
    val.tag(tag)
    if (tag === 'Ordinal' || tag === 'Cardinal') {
      agree(val, tag === 'Ordinal' || obj.num === 1)
    }
    return val
  })
  return view.update(res.pointer)
}

export default convert
