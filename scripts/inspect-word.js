/* eslint-disable no-console */
import inspect from './inspect-word/model.js'
import format from './inspect-word/format.js'

const help = `Usage: node scripts/inspect-word.js WORD [options]
  --in TEXT          Include the word's tagging trace in a sentence
  --json             Output JSON (equivalent to --format json)
  --format FORMAT    pretty (default), text (no colors), or json
  --no-color         Disable terminal colors; also respects NO_COLOR
  --help             Show this help

Source hits are candidates, not proven provenance. Related forms are morphological
suggestions. Indexed rules are candidates, not necessarily matches in a sentence.`

const main = async args => {
  const options = { format: 'pretty', color: !Object.hasOwn(process.env, 'NO_COLOR') && process.env.FORCE_COLOR !== '0' }
  let word
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--help') {
      console.log(help)
      return
    }
    if (arg === '--json') {
      options.format = 'json'
    } else if (arg === '--no-color') {
      options.color = false
    } else if (arg === '--in' || arg === '--format') {
      const value = args[++i]
      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for ${arg}`)
      }
      options[arg.slice(2)] = value
    } else if (arg.startsWith('-') || word !== undefined) {
      throw new Error(`Unexpected argument: ${arg}`)
    } else {
      word = arg.trim().toLowerCase()
    }
  }
  if (!word || !['pretty', 'text', 'json'].includes(options.format)) {
    throw new Error('Supply a word and a format of pretty, text, or json. Use --help for examples.')
  }
  // Suppress the model's startup banner in every output format.
  const log = console.log
  let nlp
  try {
    console.log = () => {}
    nlp = (await import('../src/two.js')).default
  } finally {
    console.log = log
  }
  nlp.verbose(false)
  const report = inspect(nlp, word, options.in)
  if (options.format === 'json') {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(format(report, options.color && options.format === 'pretty'))
  }
}

main(process.argv.slice(2)).catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
