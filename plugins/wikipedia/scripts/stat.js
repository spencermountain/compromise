/* eslint-disable no-console */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

import conf from '../config.js'
const { lang, project } = conf
const file = `./files/${lang}.${project}-pageviews.json`
// const file = './files/pageviews.tsv'

const round = n => Math.round(n * 10) / 10

const fileSize = (pathStr) => {
  const kb = fs.statSync(pathStr).size / 1024
  const num = round(kb / 1000)
  return num.toLocaleString() + 'mb'
}

console.log('article count ( lines):')

//raw: 40,043,607
//filtered: 1,049,500
const stdout = execFileSync('wc', ['-l', file], { encoding: 'utf8' })
const lines = Number(stdout.trim().split(/\s+/)[0]).toLocaleString()

console.log('lines', lines)
console.log('size', fileSize(file))
