const { compilePointer, untilde } = require('./_pointer')

const get = function (obj, pointer) {
  if (typeof obj !== 'object') throw new Error('Invalid input object.')
  pointer = compilePointer(pointer)
  let len = pointer.length
  if (len === 1) return obj

  for (let p = 1; p < len; ) {
    obj = obj[untilde(pointer[p++])]
    if (len === p) return obj
    if (typeof obj !== 'object') return undefined
  }
}

module.exports = get
