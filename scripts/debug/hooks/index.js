/* eslint-disable no-console */
import View from '../../../src/API/View.js'
import inputs from '../../../src/API/inputs.js'
import { dim } from '../../../src/API/_color.js'
import colorSpec from './_lib.js'

const help = `Usage: pnpm debug:hooks TEXT [--json] [--no-color]
Print spec output after tokenization and every hook in the full build.
Spec shows root tags; --json includes full term snapshots.
Use pnpm --silent debug:hooks TEXT --json for machine-readable output.`

const main = async args => {
  if (args.includes('--help')) {
    console.log(help)
    return
  }
  const words = args.filter(arg => !['--json', '--no-color'].includes(arg))
  if (!words.length || words.some(arg => arg.startsWith('--'))) {
    throw new Error(help)
  }
  const json = args.includes('--json')
  const color = !args.includes('--no-color') && !Object.hasOwn(process.env, 'NO_COLOR') && process.env.FORCE_COLOR !== '0'
  // Keep model startup logging out of snapshots and JSON.
  const log = console.log
  let nlp
  try {
    console.log = () => {}
    nlp = (await import('../../../src/three.js')).default
  } finally {
    console.log = log
  }
  nlp.verbose(false)
  // Unlike nlp.tokenize(), inputs does not pre-run contraction/normalization hooks.
  const doc = inputs(words.join(' '), View, nlp.world())
  const hooks = [...nlp.hooks()]
  const width = Math.max('tokenize'.length, ...hooks.map(hook => hook.length))
  const snapshots = []
  const snapshot = hook => {
    const spec = doc.out('spec')
    if (json) {
      snapshots.push({ hook, spec, terms: globalThis.structuredClone(doc.docs.map(terms => terms.map(term => ({
        ...term, tags: [...term.tags],
      })))) })
    } else {
      const output = color ? colorSpec(doc) : spec
      output.split('\n').forEach((line, i) => {
        const label = (i === 0 ? hook : '').padEnd(width)
        console.log(`  ${color ? dim(label) : label}  ${line}`)
      })
    }
  }
  snapshot('tokenize')
  hooks.forEach(hook => {
    doc.compute(hook)
    snapshot(hook)
  })
  if (json) {
    console.log(JSON.stringify(snapshots, null, 2))
  }
}

main(process.argv.slice(2)).catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
