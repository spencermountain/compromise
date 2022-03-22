/* eslint-disable no-console */
import sh from 'shelljs'
import fs from 'fs'

import conf from '../config.js'
const { lang, project } = conf
const file = `./files/${lang}.${project}-pageviews.json`
// const file = './files/pageviews.tsv'

const round = n => Math.round(n * 10) / 10

const fileSize = (pathStr) => {
  let kb = fs.statSync(pathStr).size / 1024
  let num = round(kb / 1000)
  return num.toLocaleString() + 'mb'
}

console.log('article count ( lines):')

//raw: 40,043,607
//filtered: 1,049,500
const { stdout } = sh.exec(`wc -l ${file}`, { silent: true })
const lines = Number(stdout.split(/\W/)[1]).toLocaleString()

console.log('lines', lines)
console.log('size', fileSize(file))
