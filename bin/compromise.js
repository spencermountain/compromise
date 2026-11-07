#!/usr/bin/env node
/* eslint-disable no-console */
import nlp from '../src/three.js'
import { parseArgs, help } from './_lib/args.js'
import { expandFiles, inputs } from './_lib/input.js'

// doc.json() with any extra fields the flags asked for
const toJson = function (doc, extras) {
  const { offsets, bestTag, ...rest } = extras
  if (bestTag) {
    doc.compute('tagRank')
  }
  if (rest.root) {
    doc.compute('root')
  }
  const json = doc.json({ ...rest, offset: offsets })
  if (bestTag) {
    json.forEach(o => {
      o.terms.forEach(t => (t.bestTag = t.tagRank?.[0] || null))
    })
  }
  return json
}

// render one parsed document in the chosen format
const format = function (doc, opts) {
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
  const json = toJson(doc, opts.json)
  if (opts.out === 'jsonl') {
    return JSON.stringify(json)
  }
  return JSON.stringify(json, null, 2)
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
  // default output: a single input pretty-prints, several become json-lines
  if (opts.out === null) {
    const many = opts.stream || paths.length + (opts.text.length > 0 ? 1 : 0) > 1
    opts.out = many ? 'jsonl' : 'json'
  }
  for await (const text of inputs(opts, paths)) {
    let doc = nlp(text)
    if (opts.if) {
      doc = doc.if(opts.if)
    }
    if (opts.has) {
      doc = doc.if(opts.has).first()
    }
    if (opts.match) {
      doc = doc.match(opts.match)
    }
    const str = format(doc, opts)
    if (str !== null) {
      console.log(str)
    }
    // --has stops at the first hit, even mid-stream
    if (opts.has && doc.found) {
      break
    }
  }
}

main().catch(e => {
  console.error(e.message)
  process.exitCode = 1
})
