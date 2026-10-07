import * as cli from './_color.js'
import debug from './debug.js'

const colorSpec = doc => {
  return doc.docs
    .map((terms, i) => {
      const plain = terms
        .map(t => t.pre + t.text + t.post)
        .join('')
        .trim()
      const text = cli.dim("'" + plain + "'")
      const spec = doc.update([[i]]).out('spec')
      return text + cli.grey(cli.i(spec.slice(plain.length)))
    })
    .join('\n')
}

// Trace the actual pipeline once, including the initial tokenized document.
const hooksDebug = headings => (doc, hooks) => {
  const width = Math.max('tokenize'.length, ...hooks.map(hook => hook.length))
  const snapshot = (hook, nested = false) => {
    const output = colorSpec(doc)
    output.split('\n').forEach((line, i, lines) => {
      if (nested) {
        const branch = i === lines.length - 1 ? ' ╰─' : '│ '
        console.log(`  ${cli.dim(branch)} ${line}`) // eslint-disable-line no-console
        return
      }
      const label = (i === 0 ? hook : '').padEnd(width)
      console.log(`  ${cli.dim(label)}  ${line}`) // eslint-disable-line no-console
    })
  }
  snapshot('tokenize')
  hooks.forEach(hook => {
    const nested = headings
    const prefix = debug.prefix
    const rule = debug.rule
    debug.rule = undefined
    if (nested) {
      console.log(`  ${cli.blue(cli.b(cli.ul(hook + ':')))}`) // eslint-disable-line no-console
      debug.prefix = cli.dim('   │  ')
    }
    // Restore the log prefix even when a plugin hook throws.
    try {
      doc.compute(hook)
      snapshot(hook, nested)
    } finally {
      debug.prefix = prefix
      debug.rule = rule
    }
  })
}

export default hooksDebug
