import { textFromDoc } from './_text.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const fmts = {
  text: {
    use: 'text',
  },
  normal: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'normal',
  },
  machine: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'none',
    unicode: 'some',
    use: 'machine',
  },
  root: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'root',
  },
}
fmts.clean = fmts.normal
fmts.reduced = fmts.root
fmts.implicit = fmts.machine

export default {
  /** */
  text: function (fmt) {
    let opts = {
      keepSpace: true,
      keepPunct: true,
    }
    if (fmt && typeof fmt === 'string' && fmts.hasOwnProperty(fmt)) {
      opts = Object.assign({}, fmts[fmt])
    } else if (fmt && isObject(fmt)) {
      opts = Object.assign({}, fmt, opts)//todo: fixme
    }
    if (this.pointer) {
      opts.keepSpace = false
      let ptr = this.pointer[0]
      if (ptr && ptr[1]) {
        opts.keepPunct = false
      } else {
        opts.keepPunct = true
      }
    }
    return textFromDoc(this.docs, opts)
  },
}
