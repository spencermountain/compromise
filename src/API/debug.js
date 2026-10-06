const env = globalThis.process?.env ?? globalThis.env ?? {}
const debug = { tags: Boolean(env.DEBUG_TAGS) }

const green = str => '\x1b[32m' + str + '\x1b[0m'
const red = str => '\x1b[31m' + str + '\x1b[0m'
const blue = str => '\x1b[34m' + str + '\x1b[0m'
const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'
const yellow = str => '\x1b[33m' + str + '\x1b[0m'
const black = str => '\x1b[30m' + str + '\x1b[0m'
const b = str => '\x1b[1m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'
const i = str => '\x1b[3m' + str + '\x1b[0m'
const ul = str => '\x1b[4m' + str + '\x1b[0m'

// Capture only the requested terms, and only while tracing.
const before = term => {
  if (debug.tags && (!debug.word || debug.word === (term.normal || term.text || term.implicit || '').toLowerCase())) {
    return [...term.tags]
  }
  return null
}

// Both console output and JSON consumers see actual changes, including conflicts.
const log = (term, previous, reason = '') => {
  if (!previous) {
    return
  }
  const added = [...term.tags].filter(tag => !previous.includes(tag))
  const removed = previous.filter(tag => !term.tags.has(tag))
  if (!added.length && !removed.length) {
    return
  }
  const event = {
    text: term.text || term.implicit || '',
    normal: term.normal,
    index: term.index?.slice(),
    reason,
    added,
    removed,
  }
  if (debug.emit) {
    debug.emit(event)
    return
  }
  const changes = [...removed.map(tag => `-#${tag}`), ...added.map(tag => `#${tag}`)]
  const index = `${event.index?.join(':') || '?'}`
  const tags = changes
    .map(tag => {
      if (tag.startsWith('-')) {
        return red(tag)
      }
      return green(tag)
    })
    .join(' ')
  const word = `'${b(yellow(event.text) + "'").padEnd(30)}  ${dim(index)}`
  console.log(`   ${word.padEnd(50)} ${dim(`(${reason})`).padEnd(25)} ${tags}`) // eslint-disable-line no-console
}

debug.before = before
debug.log = log
export default debug
