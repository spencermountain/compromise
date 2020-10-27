function isClientSide() {
  return typeof window !== 'undefined' && window.document
}

/** add spaces at the end */
const padEnd = function (str, width) {
  str = str.toString()
  while (str.length < width) {
    str += ' '
  }
  return str
}

/** output for verbose-mode */
exports.logTag = function (t, tag, reason) {
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  + ' + tag + ' ', 'color: #6accb2;')
    return
  }
  //server-side
  let log = '\x1b[33m' + padEnd(t.clean, 15) + '\x1b[0m + \x1b[32m' + tag + '\x1b[0m '
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason + ''
  }
  console.log(log)
}

/** output for verbose mode  */
exports.logUntag = function (t, tag, reason) {
  if (isClientSide()) {
    console.log('%c' + padEnd(t.clean, 3) + '  - ' + tag + ' ', 'color: #AB5850;')
    return
  }
  //server-side
  let log = '\x1b[33m' + padEnd(t.clean, 3) + ' \x1b[31m - #' + tag + '\x1b[0m '
  if (reason) {
    log = padEnd(log, 35) + ' ' + reason
  }
  console.log(log)
}

exports.isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

exports.titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}
