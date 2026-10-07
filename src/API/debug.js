import { red, green, dim, white } from './_color.js'
const env = globalThis.process?.env ?? globalThis.env ?? {}
const debug = { tags: Boolean(env.DEBUG_TAGS) }

// Capture only the requested terms, and only while tracing.
const before = term => {
  if (debug.tags && (!debug.word || debug.word === (term.normal || term.text || term.implicit || '').toLowerCase())) {
    return [...term.tags]
  }
  return null
}

// Show actual changes, including conflict removals.
const log = (term, previous, reason = '') => {
  if (!previous) {
    return
  }
  const added = [...term.tags].filter(tag => !previous.includes(tag))
  const removed = previous.filter(tag => !term.tags.has(tag))
  if (!added.length && !removed.length) {
    return
  }
  const text = term.text || term.implicit || ''
  const index = term.index?.join(':') || '?'
  const prefix = debug.prefix || '   '
  if (debug.rule !== reason) {
    const headingPrefix = debug.prefix ? prefix.replace('│  ', '│ ') : '  '
    console.log(`${headingPrefix}${dim(white((reason || 'tag change') + ':'))}`) // eslint-disable-line no-console
    debug.rule = reason
  }
  const print = (tags, sign, color) => {
    if (!tags.length) {
      return
    }
    const word = color(`'${text}'`)
    const changes = tags.map(tag => color(`#${tag}`)).join(' ')
    console.log(`${prefix}${color(sign)} ${word} ${dim(index.padEnd(9))} ${changes}`) // eslint-disable-line no-console
  }
  print(removed, '−', red)
  print(added, '+', green)
}

debug.before = before
debug.log = log
export default debug
