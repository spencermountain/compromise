#!/usr/bin/env node
/* eslint-disable no-console */
import nlp from '../src/three.js'
import { parseArgs, help } from './_lib/args.js'
import { expandFiles, batches } from './_lib/input.js'
import highlight from './_lib/highlight.js'

// doc.json() with any extra fields the flags asked for
const toJson = function (doc, extras, base) {
  const { offsets, bestTag, ...rest } = extras
  if (bestTag) {
    doc.compute('tagRank')
  }
  if (rest.root) {
    doc.compute('root')
  }
  const json = doc.json({ ...rest, offset: offsets })
  json.forEach(o => {
    if (bestTag) {
      o.terms.forEach(t => (t.bestTag = t.tagRank?.[0] || null))
    }
    // offsets are per-batch; shift them to the start of the file
    if (offsets) {
      o.offset.start += base
      o.terms.forEach(t => (t.offset.start += base))
    }
  })
  return json
}

// a sentence may wrap across lines in the source; keep it on one output line
const oneLine = str => str.replace(/\s+/g, ' ').trim()

// print one batch in the chosen format - one line per sentence, or per match
const emit = function (doc, opts, base) {
  if (opts.format === 'text') {
    doc.out('array').forEach(str => console.log(oneLine(str)))
  } else if (opts.format === 'spec') {
    doc.docs.forEach((_terms, i) => console.log(oneLine(doc.eq(i).out('spec'))))
  } else if (opts.format === 'debug') {
    doc.debug()
  } else {
    toJson(doc, opts.json, base).forEach(o => console.log(JSON.stringify(o)))
  }
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
  const paths = await expandFiles(opts.files)
  for await (const batch of batches(nlp, opts, paths)) {
    let doc = nlp(batch.text)
    if (opts.if) {
      doc = doc.if(opts.if)
    }
    if (opts.has) {
      doc = doc.if(opts.has).first()
    }
    if (opts.format === 'highlight') {
      const pattern = opts.match || opts.if || opts.has
      const color = !Object.hasOwn(process.env, 'NO_COLOR')
      const str = highlight(doc, pattern, { width: opts.width || 55, color })
      if (str) {
        console.log(str)
      }
    } else if (doc.found) {
      if (opts.match) {
        doc = doc.match(opts.match)
      }
      if (doc.found) {
        emit(doc, opts, batch.offset)
      }
    }
    // --has stops at the first hit; returning closes the file stream
    if (opts.has && doc.found) {
      return
    }
  }
}

// a closed pipe (e.g. `| head`) is not an error
process.stdout.on('error', e => {
  if (e.code === 'EPIPE') {
    process.exit(0)
  }
})

main().catch(e => {
  console.error(e.message)
  process.exitCode = 1
})
