/* eslint-disable no-console */
// import { yellow, blue, green, red, dim } from 'colorette'
const reset = '\x1b[0m'

//cheaper than requiring chalk
const cli = {
  green: function (str) {
    return '\x1b[32m' + str + reset
  },
  red: function (str) {
    return '\x1b[31m' + str + reset
  },
  blue: function (str) {
    return '\x1b[34m' + str + reset
  },
  magenta: function (str) {
    return '\x1b[35m' + str + reset
  },
  cyan: function (str) {
    return '\x1b[36m' + str + reset
  },
  yellow: function (str) {
    return '\x1b[33m' + str + reset
  },
  black: function (str) {
    return '\x1b[30m' + str + reset
  },
}

const split = (txt, offset) => {
  let pre = txt.substring(0, offset.start)
  let mid = txt.substring(offset.start, offset.start + offset.length)
  let post = txt.substring(offset.start + offset.length, txt.length)
  return [pre, mid, post]
}

const printMatch = function (m) {
  let doc = m.sentences()
  if (!doc.found || !m.found) {
    return
  }
  m.compute('offset')
  let json = m.json({ offset: true })
  console.log(json)
  // highlight matches
  json.forEach(res => {
    let parts = split(doc.text(), res.offset)
    let out = `${parts[0]}${cli.green(parts[1])}${parts[2]}`
    console.log(out)
  })
  // highlight subject
  // parts = split(text, m.subject.offset)
  // text = `${parts[0]}${blue(parts[1])}${parts[2]}`
}
export default printMatch
