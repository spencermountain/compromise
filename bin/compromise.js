#!/usr/bin/env node
/* eslint-disable no-console */
import nlp from '../src/three.js'
import { parseArgs, help } from './_lib/args.js'
import inputs from './_lib/input.js'

// render one parsed document in the chosen format
const format = function (doc, opts, compact) {
  if (opts.out === 'text') {
    return doc.out('array').join('\n')
  }
  if (opts.out === 'spec') {
    return doc.out('spec')
  }
  if (opts.out === 'debug') {
    doc.debug()
    return null
  }
  return compact ? JSON.stringify(doc.json()) : JSON.stringify(doc.json(), null, 2)
}

const main = async function () {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    console.log(help)
    return
  }
  if (opts.version) {
    console.log(nlp.version)
    return
  }
  const hasInput = opts.text.length > 0 || opts.files.length > 0 || !process.stdin.isTTY
  if (!hasInput) {
    console.error(help)
    process.exitCode = 1
    return
  }
  // a single input pretty-prints; several become newline-delimited json
  const compact = opts.stream || opts.files.length > 1 || (opts.text.length > 0 && opts.files.length > 0)
  for await (const text of inputs(opts)) {
    let doc = nlp(text)
    if (opts.match) {
      doc = doc.match(opts.match)
    }
    const str = format(doc, opts, compact)
    if (str !== null) {
      console.log(str)
    }
  }
}

main().catch(e => {
  console.error(e.message)
  process.exitCode = 1
})
