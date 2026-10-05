/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import nlp from '../../../src/two.js'
import model from '../../../src/2-two/postTagger/model/index.js'
import secondPass from '../../../src/2-two/postTagger/model/second-pass.js'
import { createSweepProfiler } from './sweep-profiler.js'
import { formatYaml, formatTable } from './sweep-report.js'

const help = `Usage: node scripts/bench/post-tagger/sweep-profile.js corpus.txt [options]
  --out FILE          Write YAML keyed by pattern, including rule names
  --top N             Rules to print (default: 20)
  --sort FIELD        tag-rate (default, lowest first), attempts, edits, misses, no-tag, miss-ms
  --timing            Time failed matcher calls; implied by --sort miss-ms
  --batch-chars N     Target batch size at paragraph boundaries (default: 24000)
  --color             Force CLI colors
  --no-color          Disable CLI colors
  --help              Show this help

Requires matching counts calls that survived early filtering.
Tag edits counts terms whose tags changed, including removals.
Tag rate is edits / attempts; untried rules sort last.`

const parseArgs = args => {
  const opts = { top: 20, sort: 'tag-rate', timing: false, batchChars: 24000 }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--help') {
      return { help: true }
    }
    if (arg === '--timing') {
      opts.timing = true
    } else if (arg === '--color' || arg === '--no-color') {
      opts.color = arg === '--color'
    } else if (['--out', '--top', '--sort', '--batch-chars'].includes(arg)) {
      const value = args[++i]
      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for ${arg}`)
      }
      const keys = { '--out': 'out', '--top': 'top', '--sort': 'sort', '--batch-chars': 'batchChars' }
      opts[keys[arg]] = value
    } else if (arg.startsWith('--') || opts.file) {
      throw new Error(`Unexpected argument: ${arg}`)
    } else {
      opts.file = path.resolve(arg)
    }
  }
  opts.file =  'scripts/bench/infinite-jest.txt'
  opts.top = Number(opts.top)
  opts.batchChars = Number(opts.batchChars)
  if (
    !opts.file ||
    !Number.isInteger(opts.top) ||
    opts.top < 1 ||
    !Number.isInteger(opts.batchChars) ||
    opts.batchChars < 1
  ) {
    throw new Error('Supply a corpus and positive integer --top/--batch-chars values')
  }
  if (!['tag-rate', 'attempts', 'edits', 'misses', 'no-tag', 'miss-ms'].includes(opts.sort)) {
    throw new Error('Unknown sort field')
  }
  if (opts.out) {
    opts.out = path.resolve(opts.out)
    if (
      opts.out === opts.file ||
      (fs.existsSync(opts.out) && fs.realpathSync(opts.out) === fs.realpathSync(opts.file))
    ) {
      throw new Error('Output must differ from the corpus')
    }
  }
  opts.timing ||= opts.sort === 'miss-ms'
  return opts
}

// Paragraphs remain intact, even if one exceeds the target batch size.
const readCorpus = async (file, batchChars, consume) => {
  const input = fs.createReadStream(file, { encoding: 'utf8' })
  const lines = readline.createInterface({ input, crlfDelay: Infinity })
  let paragraph = []
  let batch = []
  let size = 0
  const flushBatch = () => {
    if (batch.length) {
      consume(batch.join('\n\n'))
    }
    batch = []
    size = 0
  }
  const flushParagraph = () => {
    if (!paragraph.length) {
      return
    }
    const text = paragraph.join('\n')
    paragraph = []
    if (size && size + text.length + 2 > batchChars) {
      flushBatch()
    }
    batch.push(text)
    size += text.length + 2
    if (size >= batchChars) {
      flushBatch()
    }
  }
  try {
    for await (const line of lines) {
      if (line.trim()) {
        paragraph.push(line)
      } else {
        flushParagraph()
      }
    }
    flushParagraph()
    flushBatch()
  } finally {
    lines.close()
    input.destroy()
  }
}

const main = async () => {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    console.log(help)
    return
  }
  const profiler = createSweepProfiler(
    nlp,
    [
      { name: 'main', rules: model.two.matches },
      { name: 'second', rules: secondPass },
    ],
    { timing: opts.timing }
  )
  let sentences = 0
  let terms = 0
  let characters = 0
  let lastProgress = 0
  try {
    await readCorpus(opts.file, opts.batchChars, text => {
      const doc = nlp(text)
      sentences += doc.docs.length
      doc.docs.forEach(sentence => {
        terms += sentence.length
      })
      characters += text.length
      if (characters - lastProgress >= 250000) {
        process.stderr.write(`Processed ${characters.toLocaleString()} characters\n`)
        lastProgress = characters
      }
    })
  } finally {
    profiler.close()
  }
  const rows = profiler.report()
  const fields = {
    attempts: 'attempts',
    edits: 'changedTerms',
    misses: 'misses',
    'no-tag': 'noTagAttempts',
    'miss-ms': 'missMs',
  }
  const rate = row => (row.attempts ? row.changedTerms / row.attempts : Infinity)
  rows.sort((a, b) => {
    let order = b[fields[opts.sort]] - a[fields[opts.sort]]
    if (opts.sort === 'tag-rate') {
      order = rate(a) - rate(b)
    }
    return order || b.attempts - a.attempts || a.id.localeCompare(b.id)
  })
  if (opts.out) {
    fs.mkdirSync(path.dirname(opts.out), { recursive: true })
    fs.writeFileSync(opts.out, formatYaml({ rules: rows }))
  }
  let color = Boolean(process.stdout.isTTY)
  if (process.env.FORCE_COLOR !== undefined) {
    color = process.env.FORCE_COLOR !== '0'
  }
  if (process.env.NO_COLOR !== undefined) {
    color = false
  }
  color = opts.color ?? color
  console.log(`${sentences.toLocaleString()} sentences; ${terms.toLocaleString()} terms; ${rows.length} rules`)
  console.log(`Sorted by ${opts.sort}. Tag edits count changed terms immediately after each action.\n`)
  console.log(formatTable(rows.slice(0, opts.top), { color }))
  if (opts.out) {
    console.log(`\nFull report: ${opts.out}`)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}

export { readCorpus }
