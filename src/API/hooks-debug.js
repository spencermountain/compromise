import * as cli from './_color.js'
import debug from './debug.js'

const colorSpec = doc => {
  const tagSet = doc.model.one.tagSet
  return doc.docs
    .map((terms, i) => {
      const plain = terms
        .map(t => t.pre + t.text + t.post)
        .join('')
        .trim()
      let text = terms
        .map(term => {
          const tag = [...term.tags][0]
          const color = tag ? tagSet[tag]?.color || 'blue' : 'grey'
          return term.pre + (term.text ? cli[color](term.text) : '') + term.post
        })
        .join('')
        .trim()
      text = cli.grey("'") + text + cli.grey("'")
      const spec = doc.update([[i]]).out('spec')
      return text + cli.grey(cli.i(spec.slice(plain.length)))
    })
    .join('\n')
}

// Trace the actual pipeline once, including the initial tokenized document.
const hooksDebug = (options, headings) => (doc, hooks) => {
  const env = globalThis.process?.env ?? globalThis.env ?? {}
  const color = options.color !== false && !Object.hasOwn(env, 'NO_COLOR') && env.FORCE_COLOR !== '0'
  const width = Math.max('tokenize'.length, ...hooks.map(hook => hook.length))
  const snapshot = (hook, nested = false) => {
    if (options.emit) {
      options.emit({
        type: 'hooks',
        hook,
        spec: doc.out('spec'),
        terms: globalThis.structuredClone(
          doc.docs.map(terms =>
            terms.map(term => ({
              ...term,
              tags: [...term.tags],
            }))
          )
        ),
      })
      return
    }
    const output = color ? colorSpec(doc) : doc.out('spec')
    output.split('\n').forEach((line, i, lines) => {
      if (nested) {
        const branch = i === lines.length - 1 ? ' ╰─' : '│ '
        console.log(`  ${color ? cli.dim(branch) : branch} ${line}`) // eslint-disable-line no-console
        return
      }
      const label = (i === 0 ? hook : '').padEnd(width)
      console.log(`  ${color ? cli.dim(label) : label}  ${line}`) // eslint-disable-line no-console
    })
  }
  snapshot('tokenize')
  hooks.forEach(hook => {
    const nested = headings && !options.emit
    const prefix = debug.prefix
    if (nested) {
      console.log(`  ${color ? cli.b(cli.ul(hook + ':')) : hook}`) // eslint-disable-line no-console
      debug.prefix = cli.dim('   │  ')
    }
    // Restore the log prefix even when a plugin hook throws.
    try {
      doc.compute(hook)
      snapshot(hook, nested)
    } finally {
      debug.prefix = prefix
    }
  })
}

export default hooksDebug
