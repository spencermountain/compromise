import { red, green, b, yellow, dim } from './_color.js'
const env = globalThis.process?.env ?? globalThis.env ?? {}
const debug = { tags: Boolean(env.DEBUG_TAGS) }

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
  console.log(`${debug.prefix || '   '}${word.padEnd(50)} ${dim(`(${reason})`).padEnd(25)} ${tags}`) // eslint-disable-line no-console
}

debug.before = before
debug.log = log
export default debug
