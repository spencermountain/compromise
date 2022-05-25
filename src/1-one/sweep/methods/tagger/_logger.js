
const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const logger = function (todo, document) {
  let [n, start, end] = todo.pointer
  let terms = document[n]
  let i = start > 4 ? start - 2 : 0
  let tag = todo.tag || ''
  if (isArray(todo.tag)) {
    tag = todo.tag.join(' #')
  }
  let reason = todo.reason || todo.match
  reason = reason ? `|${reason}|` : ''
  let msg = `  ${reason}`.padEnd(20) + ' - '
  const yellow = str => '\x1b[2m' + str + '\x1b[0m'
  for (; i < terms.length; i += 1) {
    if (i > end + 2) {
      break
    }
    let str = terms[i].machine || terms[i].normal
    msg += i > start && i < end ? `\x1b[32m${str}\x1b[0m ` : `${yellow(str)} ` // matched terms are green
  }
  msg += '  \x1b[32m→\x1b[0m #' + tag.padEnd(12) + '  '
  console.log(msg) //eslint-disable-line
}
export default logger
