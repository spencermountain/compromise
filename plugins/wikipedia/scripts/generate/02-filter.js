/* eslint-disable no-console */
import fs from 'fs'
import sh from 'shelljs'
import { blue, yellow } from 'colorette'
import nlp from '../../../../src/two.js'
import nos from './_no-list.js'
import conf from '../../config.js'

const { lang, project, min_pageviews } = conf
const tsvOut = `./files/${lang}.${project}-pageviews.tsv`
const output = `./files/${lang}.${project}-pageviews.json`
const file = `./files/pageviews.tsv`

const lex = nlp.model().one.lexicon

const keep = {
  Person: true,
  Place: true,
  Organization: true,
  Country: true,
  City: true,
  Region: true,
  SportsTeam: true,
}
const noList = new Set(nos)

// const userPage = /^User:./
// const userTalk = /^User talk:./
// const catPage = /^Category:./
const list = /^list of ./
const hasNum = /[0-9]/

const hasPunct = /[.,/#!$%^&*;:{}=_`~()+\\]/

//tot to internal id
const toName = function (title = '') {
  title = title.replace(/_/g, ' ')
  title = title.trim().toLowerCase()
  return title
}

const ignorePage = function (title) {
  if (title === 'main page' || title.length < 3) {
    return true
  }
  // block by compromise lexicon
  if (lex[title] && keep[lex[title]] !== true) {
    return true
  }
  if (hasNum.test(title) || hasPunct.test(title) || list.test(title)) {
    return true
  }
  // ban-list
  if (noList.has(title)) {
    return true
  }
  return false
}

const toList = function () {
  let final = []
  let nope = 0
  const arr = fs.readFileSync(tsvOut).toString().split(/\n/)
  for (let i = 0; i < arr.length; i += 1) {
    const a = arr[i].split(' ')
    let title = a[1]
    if (title !== undefined && a[4] !== '1') {
      title = toName(title)
      const num = Number(a[4])
      // another filter
      if (ignorePage(title) === true) {
        continue
      }
      if (num <= min_pageviews) {
        nope += 1
      } else {
        final.push([title, num])
      }
    }
  }
  final = final.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else if (a[1] < b[1]) {
      return 1
    }
    return 0
  })
  final = final.map(a => a[0])
  console.log(`   ... removed ${nope.toLocaleString()} articles`)
  console.log('final list', Object.keys(final).length.toLocaleString(), ' articles')
  final = JSON.stringify(final, null, 2)
  fs.writeFileSync(output, final)
  return final
}

const round = n => Math.round(n * 10) / 10

const fileSize = (pathStr) => {
  const kb = fs.statSync(pathStr).size / 1024
  const num = round(kb / 1000)
  return num.toLocaleString() + 'mb'
}

const getLines = function (fpath) {
  const { stdout } = sh.exec(`wc -l ${fpath}`, { silent: true })
  const arr = stdout.split(/\W/).filter(s => s)
  const lines = Number(arr[0]).toLocaleString()
  console.log('   ', blue(lines))
}

const filterIt = function () {
  console.log(yellow('initial dump size (~40m lines):'))
  // 40,043,607
  getLines(file)
  console.log('   ', fileSize(file))

  console.log(yellow('\n--running grep filter--'))
  //filter-it down to our project only
  sh.exec(`grep '^${lang}.${project} .* desktop ' ${file} > ${tsvOut}`)

  console.log(yellow('\n--running regex filters--'))
  console.log('  min pageview: ', min_pageviews)
  console.log('   ', blue(fileSize(tsvOut)))
  toList()
  console.log(yellow('\n\n out ->'))
  getLines(output, 'lines')
  console.log('   uncompressed: ', fileSize(output))
}
export default filterIt