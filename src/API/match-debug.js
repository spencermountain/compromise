import { green, red, cyan, dim } from './_color.js'
import debug from './debug.js'

// Install only while verbose matching is enabled; restore the original hot path.
const matchDebug = (world, options) => {
  const one = world.methods.one
  const match = one.match
  const parse = one.parseMatch
  const sources = new WeakMap()
  const word = options.word?.toLowerCase()
  const includesWord = terms =>
    !word || terms.some(term => (term.normal || term.text || term.implicit || '').toLowerCase() === word)

  const parseLogged = function (...args) {
    const regs = parse.apply(this, args)
    sources.set(regs, String(args[0]))
    return regs
  }
  const matchLogged = function (docs, todo, cache) {
    const result = match.call(this, docs, todo, cache)
    const pattern = todo.match || sources.get(todo.regs) || '[parsed pattern]'
    if (options.pattern !== undefined && pattern !== options.pattern) {
      return result
    }
    if (word && !docs.some(includesWord)) {
      return result
    }
    const matches = result.ptrs
      .map(([n, start, end]) => docs[n].slice(start, end))
      .filter(includesWord)
      .map(terms => ({
        text: terms.map(term => term.text || term.implicit).join(' '),
        index: terms[0]?.index?.slice(),
        length: terms.length,
      }))
    if (word && result.ptrs.length && !matches.length) {
      return result
    }
    const event = {
      type: 'match',
      pattern,
      matched: result.ptrs.length > 0,
      matches,
    }
    if (options.emit) {
      options.emit(event)
    } else {
      debug.rule = undefined
      const status = event.matched ? green('✓') : red('✗')
      const spans = matches.map(span => `${span.index?.join(':') || '?'} "${span.text}"`).join(', ')
      console.log(`${debug.prefix || '   '}${status}  ${cyan("'" + pattern + "'").padEnd(32)}   ${dim(spans)}`) // eslint-disable-line no-console
    }
    return result
  }
  one.parseMatch = parseLogged
  one.match = matchLogged
  return () => {
    // Do not overwrite a plugin's replacement installed during tracing.
    if (one.parseMatch === parseLogged) {
      one.parseMatch = parse
    }
    if (one.match === matchLogged) {
      one.match = match
    }
  }
}

export default matchDebug
