/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'
import { fileURLToPath } from 'url'
import nlp from '../../src/three.js'

// Keep this input local and fixed so scores remain comparable between runs.
const SENTENCES = [
  'Dr. Ada Lovelace quickly wrote three detailed notes in London on January 12th, 1843.',
  'Grace Hopper and Alan Turing discussed reliable machines at Cambridge University.',
  'The small red foxes jumped over a surprisingly lazy dog, then ran toward the river.',
  "I can't believe they've already shipped 2,450 packages to Toronto, Canada!",
  'Will Morgan call support at (416) 555-0198 before 4:30pm tomorrow?',
  'Acme Corp. earned $12.5 million in Q2, a 17.4% increase over last year.',
  'Email help@example.com or visit https://compromise.cool/docs for more information.',
  'The well-known artist said, "These paintings are brighter than my earlier work."',
  'On Monday, two-thirds of the team will walk five kilometres through High Park.',
  'New York City-based researchers re-tested the colour-sensitive equipment in 2025.',
  'Samantha bought twelve green apples, four loaves of bread, and half a kilogram of rice.',
  'If the weather becomes colder, the children may have been waiting inside for hours.',
  'NASA, IBM, and the University of Waterloo co-hosted the science-and-technology summit.',
  'My neighbours organize weekly games; yours usually prefer reading quietly at home.',
  'Who left @nlp_compromise a friendly message with the #opensource hashtag? 😊',
  'The first train arrives at 06:45 EST, while the twenty-second bus comes after noon.',
  'Paris is beautiful in spring, but Mount Fuji looks especially dramatic during winter.',
  'She sells seashells by the seashore, and he carefully catalogues every unusual shell.',
  'A state-of-the-art sensor measured temperatures from -12°C to 38°C without stopping.',
  'After completing the report, John Smith said the committee would review it next week.',
]

const CORPUS = Array(4).fill(SENTENCES).flat().join(' ')
const TRANSFORM_TEXT = SENTENCES.slice(0, 12).join(' ')
const MIN_SAMPLE_COUNT = 30
const MAX_SAMPLE_COUNT = 48
const SAMPLE_STEP = 6
const STABILITY_WINDOW = 30
const STABILITY_BLOCKS = 3
const STABILITY_THRESHOLD_PERCENT = 3
const TRIM_PERCENT = 20
const WARMUP_ROUNDS = 3
const TARGET_SAMPLE_MS = 200
const EQUAL_THRESHOLD_PERCENT = 4
const DEFAULT_MAX_SLOWDOWN_PERCENT = 10
const MAX_ITERATIONS = 16384
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const resultsFile = path.join(scriptDir, 'results.jsonl')

// Some package managers consume `--quiet` themselves and expose only their
// lifecycle log level. Supporting argv keeps direct execution identical.
const isQuiet =
  process.argv.includes('--quiet') ||
  process.env.npm_config_quiet === 'true' ||
  process.env.npm_config_loglevel === 'warn' ||
  process.env.npm_config_loglevel === 'silent'

let sink = 0

const median = values => {
  const sorted = values.slice().sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

const trimmedMean = values => {
  const sorted = values.slice().sort((a, b) => a - b)
  const trimCount = Math.floor((sorted.length * TRIM_PERCENT) / 100)
  const kept = sorted.slice(trimCount, sorted.length - trimCount)
  return kept.reduce((sum, value) => sum + value, 0) / kept.length
}

const runBatch = (run, iterations) => {
  let checksum = 0
  const start = performance.now()
  for (let i = 0; i < iterations; i += 1) {
    checksum += run()
  }
  const elapsed = performance.now() - start
  sink = (sink + checksum) % 2147483647
  return elapsed
}

const iterationCount = run => {
  let iterations = 1
  let elapsed = runBatch(run, iterations)
  while (elapsed < TARGET_SAMPLE_MS / 4 && iterations < MAX_ITERATIONS) {
    const multiplier = Math.min(8, Math.max(2, Math.ceil((TARGET_SAMPLE_MS / 3) / Math.max(elapsed, 0.01))))
    iterations = Math.min(MAX_ITERATIONS, iterations * multiplier)
    elapsed = runBatch(run, iterations)
  }
  const estimated = Math.ceil((iterations * TARGET_SAMPLE_MS) / Math.max(elapsed, 0.01))
  return Math.max(1, Math.min(MAX_ITERATIONS, estimated))
}

const matchDoc = nlp(CORPUS)
const selectionDoc = nlp(CORPUS)
const outputDoc = nlp(CORPUS)
const transformDoc = nlp(TRANSFORM_TEXT)

const tests = [
  {
    name: 'tokenize',
    run: () => (nlp.tokenize(CORPUS).found ? CORPUS.length : 0),
  },
  {
    name: 'parse + tag',
    run: () => (nlp(CORPUS).has('#Verb') ? CORPUS.length : 0),
  },
  {
    name: 'match syntax',
    run: () => {
      let total = 0
      total += matchDoc.match('#Person+').out('array').length
      total += matchDoc.match('[<amount>#Value+] #Noun').groups('amount').out('array').length
      total += matchDoc.match('(walk|run|jump){1,2}').out('array').length
      total += matchDoc.match('{write}').out('array').length
      total += matchDoc.match('~organization~').out('array').length
      total += matchDoc.match('@isTitleCase').out('array').length
      return total
    },
  },
  {
    name: 'selections',
    run: () => {
      let total = 0
      total += selectionDoc.people().out('array').length
      total += selectionDoc.places().out('array').length
      total += selectionDoc.organizations().out('array').length
      total += selectionDoc.nouns().out('array').length
      total += selectionDoc.verbs().out('array').length
      total += selectionDoc.numbers().get().length
      total += selectionDoc.money().out('array').length
      total += selectionDoc.questions().out('array').length
      return total
    },
  },
  {
    name: 'transforms',
    run: () => {
      const doc = transformDoc.clone()
      doc.verbs().toPastTense()
      doc.nouns().toPlural()
      doc.numbers().add(3)
      doc.contractions().expand()
      doc.adjectives().toSuperlative()
      doc.normalize({ whitespace: true, punctuation: true })
      doc.replace('London', 'Montreal')
      return doc.text().length
    },
  },
  {
    name: 'output',
    run: () => {
      const text = outputDoc.text()
      const array = outputDoc.sentences().out('array')
      const json = outputDoc.json({ offset: true, normal: true, tags: true })
      const html = outputDoc.html({ '.entity': '(#Person|#Place|#Organization)' })
      return text.length + array.length + json.length + html.length
    },
  },
]

const rotated = (values, offset) => values.slice(offset).concat(values.slice(0, offset))

const scoreFromSamples = sampleSets => {
  const suiteMilliseconds = sampleSets.reduce((sum, samples) => sum + trimmedMean(samples), 0)
  return 1000 / suiteMilliseconds
}

const stabilitySpread = sampleSets => {
  const sampleCount = Math.min(...sampleSets.map(samples => samples.length))
  const start = sampleCount - STABILITY_WINDOW
  const blockSize = STABILITY_WINDOW / STABILITY_BLOCKS
  const scores = []

  for (let block = 0; block < STABILITY_BLOCKS; block += 1) {
    const from = start + (block * blockSize)
    const to = from + blockSize
    const suiteMilliseconds = sampleSets.reduce((sum, samples) => sum + median(samples.slice(from, to)), 0)
    scores.push(1000 / suiteMilliseconds)
  }

  return ((Math.max(...scores) - Math.min(...scores)) / median(scores)) * 100
}

const benchmarkSuite = suite => {
  const prepared = suite.map(test => ({ ...test, iterations: iterationCount(test.run) }))

  // Warm every feature repeatedly before recording anything. Rotating the order
  // distributes CPU boost, heat, and background interruptions across the suite.
  for (let round = 0; round < WARMUP_ROUNDS; round += 1) {
    rotated(prepared, round % prepared.length).forEach(test => runBatch(test.run, test.iterations))
  }

  const sampleSets = prepared.map(() => [])
  let sampleCount = 0
  let spread = Infinity

  while (sampleCount < MAX_SAMPLE_COUNT) {
    const order = rotated(prepared, sampleCount % prepared.length)
    order.forEach(test => {
      const index = prepared.indexOf(test)
      sampleSets[index].push(runBatch(test.run, test.iterations) / test.iterations)
    })
    sampleCount += 1

    const mayStop = sampleCount >= MIN_SAMPLE_COUNT && (sampleCount - MIN_SAMPLE_COUNT) % SAMPLE_STEP === 0
    if (mayStop) {
      spread = stabilitySpread(sampleSets)
      if (spread <= STABILITY_THRESHOLD_PERCENT) {
        break
      }
    }
  }

  return {
    score: scoreFromSamples(sampleSets),
    stable: spread <= STABILITY_THRESHOLD_PERCENT,
  }
}

const previousResult = () => {
  if (process.env.BENCH_BASELINE_SCORE !== undefined) {
    const score = Number(process.env.BENCH_BASELINE_SCORE)
    if (!Number.isFinite(score) || score <= 0) {
      throw new Error('BENCH_BASELINE_SCORE must be a positive number')
    }
    return { score }
  }
  if (!fs.existsSync(resultsFile)) {
    return null
  }
  const lines = fs.readFileSync(resultsFile, 'utf8').trim().split('\n').filter(Boolean)
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try {
      const result = JSON.parse(lines[i])
      if (Number.isFinite(result.score)) {
        return result
      }
    } catch {
      // A damaged line should not make the benchmark unusable; try the prior one.
    }
  }
  return null
}

const useColor = Boolean(process.stdout.isTTY) && !Object.prototype.hasOwnProperty.call(process.env, 'NO_COLOR')
const color = (code, text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text)
const bold = text => color(1, text)
const dim = text => color(2, text)
const cyan = text => color(36, text)
const green = text => color(32, text)
const red = text => color(31, text)
const yellow = text => color(33, text)

const maxSlowdownPercent = () => {
  const value = process.env.BENCH_MAX_SLOWDOWN_PERCENT
  if (value === undefined) {
    return DEFAULT_MAX_SLOWDOWN_PERCENT
  }
  const percent = Number(value)
  if (!Number.isFinite(percent) || percent <= 0) {
    throw new Error('BENCH_MAX_SLOWDOWN_PERCENT must be a positive number')
  }
  return percent
}

const percentChange = (previous, current) => ((current.score - previous.score) / previous.score) * 100

const comparisonText = (previous, current) => {
  if (!previous) {
    return yellow('● baseline')
  }
  const percent = percentChange(previous, current)
  if (Math.abs(percent) < EQUAL_THRESHOLD_PERCENT) {
    return cyan('● equal to last run')
  }
  if (percent > 0) {
    return green(`▲ ${percent.toFixed(2)}% faster`)
  }
  return red(`▼ ${Math.abs(percent).toFixed(2)}% slower`)
}

const main = () => {
  const previous = previousResult()
  const allowedSlowdown = maxSlowdownPercent()

  console.log(`\n${bold(cyan(`compromise v${nlp.version}`))}`)
  console.log(dim('running benchmark…'))

  const measurement = benchmarkSuite(tests)
  const result = {
    timestamp: new Date().toISOString(),
    libraryVersion: nlp.version,
    score: Number(measurement.score.toFixed(4)),
  }

  console.log(`\n${bold(result.score.toFixed(2))} ${dim('runs/sec')}`)

  if (!measurement.stable) {
    console.log(yellow('◆ system too busy — try again'))
    console.log(dim('not saved (unstable run)'))
    if (process.env.BENCH_BASELINE_SCORE !== undefined || process.env.CI === 'true') {
      process.exitCode = 1
    }
  } else {
    console.log(comparisonText(previous, result))

    if (isQuiet) {
      console.log(dim('not saved (--quiet)'))
    } else {
      fs.appendFileSync(resultsFile, `${JSON.stringify(result)}\n`, 'utf8')
      console.log(dim(`saved to ${path.relative(process.cwd(), resultsFile)}`))
    }

    if (previous && percentChange(previous, result) <= -allowedSlowdown) {
      console.error(red(`✖ performance regression exceeds ${allowedSlowdown}%`))
      process.exitCode = 1
    }
  }

  // Keep the accumulated benchmark work observably live.
  if (!Number.isFinite(sink)) {
    throw new Error('Benchmark produced an invalid checksum')
  }
}

main()
