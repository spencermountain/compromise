import { readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { spawn } from 'node:child_process'

const directory = fileURLToPath(new URL('.', import.meta.url))
const datesDirectory = fileURLToPath(new URL('../../plugins/dates/tests/_hmm/', import.meta.url))
const discover = async dir => {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      return discover(path)
    }
    return /\.hmm(?:\.test)?\.js$/.test(entry.name) ? [path] : []
  }))
  return nested.flat().sort()
}

// Keep legacy tests in their own process: the dates plugin extends nlp globally.
const run = async (command, args) => {
  const reporter = spawn('tap-dancer', [], { stdio: ['pipe', 'inherit', 'inherit'] })
  const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'inherit'] })
  child.stdout.pipe(reporter.stdin)
  const completed = process => new Promise((done, reject) => {
    process.on('error', reject)
    process.on('close', code => done(code === 0))
  })
  const results = await Promise.all([completed(child), completed(reporter)])
  if (results.includes(false)) {
    process.exitCode = 1
  }
}

const args = process.argv.slice(2)
const datesOnly = args[0] === '--dates'
const requested = args.filter(arg => arg !== '--dates').map(path => resolve(path))
const roots = datesOnly ? [datesDirectory] : [directory, datesDirectory]
const discovered = requested.length ? [] : await Promise.all(roots.map(discover))
const files = requested.length ? requested : discovered.flat()
const legacy = files.filter(path => path.endsWith('.hmm.js'))
const fixtures = files.filter(path => path.endsWith('.hmm.test.js'))
if (legacy.length + fixtures.length !== files.length || files.length === 0) {
  throw new Error('Expected .hmm.js or .hmm.test.js files')
}
if (legacy.length) {
  await run('tape', legacy)
}
if (fixtures.length) {
  await run('tape', fixtures)
}
