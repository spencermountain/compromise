const hasExcape = /~/
const escapeMatcher = /~[01]/g

function escapeReplacer(m) {
  switch (m) {
    case '~1':
      return '/'
    case '~0':
      return '~'
  }
  throw new Error('Invalid tilde escape: ' + m)
}

function untilde(str) {
  if (!hasExcape.test(str)) {
    return str
  }
  return str.replace(escapeMatcher, escapeReplacer)
}

function compilePointer(pointer) {
  if (typeof pointer === 'string') {
    pointer = pointer.split('/')
    if (pointer[0] === '') return pointer
    throw new Error('Invalid JSON pointer.')
  } else if (Array.isArray(pointer)) {
    return pointer
  }
  throw new Error('Invalid JSON pointer.')
}

// function compile(pointer) {
//   const compiled = compilePointer(pointer)
//   return {
//     get: function (object) {
//       return get(object, compiled)
//     },
//     set: function (object, value) {
//       return set(object, compiled, value)
//     },
//   }
// }

module.exports = {
  untilde: untilde,
  compilePointer: compilePointer,
}
