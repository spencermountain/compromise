import { readFileSync, writeFileSync } from 'fs'
import wget from 'node-wget-promise'
import { blue, green, yellow } from 'colorette'
import sh from 'shelljs'
import conf from '../config.js'
const { lang, project, min_pageviews } = conf
const file = `./files/pageviews.tsv`
const tsvOut = `./files/${lang}.${project}-pageviews.tsv`
const output = `./files/${lang}.${project}-pageviews.json`
const userPage = /^User:./
const userTalk = /^User talk:./
const catPage = /^Category:./
const hasNum = /[0-9]/
const hasPunct = /[.,\/#!$%\^&\*;:{}=_`~()\\]/

//tot to internal id
const toName = function (title = '') {
  title = title.replace(/_/g, ' ')
  title = title.trim()
  return title
}

// create the filename for the last dump
const lastDump = () => {
  let d = new Date()
  d.setDate(d.getDate() - 10) // do yesterday
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const date = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}${month}${date}`
}

const ignorePage = function (title) {
  if (title === 'Main Page' || title.length < 3) {
    return true
  }
  if (hasNum.test(title) || userPage.test(title) || userTalk.test(title) || catPage.test(title) || disambig.test(title) || hasPunct.test(title)) {
    return true
  }
  return false
}

const toList = function () {
  let final = []
  let nope = 0
  let arr = readFileSync(tsvOut).toString().split(/\n/)
  console.log(arr.length, ' tsv list')
  for (let i = 0; i < arr.length; i += 1) {
    let a = arr[i].split(' ')
    let title = a[1]
    if (title !== undefined && a[4] !== '1') {
      title = toName(title)
      let num = Number(a[4])
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
  console.log(`removed ${nope.toLocaleString()} articles`)
  console.log('writing pageviews json')
  final = JSON.stringify(final, null, 2)
  writeFileSync(output, final)
  return final
}

// d/l, unzip, and filter-down the pageviews file
const doit = async function () {
  try {
    // use an already-downloaded file?
    if (true || sh.test('-e', `${file}.bz2`)) {
      console.log(`using pagefiew file: '${file}'`)
      console.log(green(' done.'))
      // return
    } else {
      // download dump
      console.log(blue(`.. downloading pageview dataset:   (~5 mins)`))
      let date = lastDump()
      let d = new Date()
      const month = `${d.getMonth() + 1}`.padStart(2, '0')
      const year = d.getFullYear()
      const url = `https://dumps.wikimedia.org/other/pageview_complete/${year}/${year}-${month}/pageviews-${date}-user.bz2`
      console.log(url)
      await wget(url, {
        output: file + '.bz2',
      })
      // unzip
      console.log(yellow(`\n unzipping pageviews data  (~4 mins)`))
      sh.exec(`bzip2 -d  ${file}.bz2`)
      console.log(yellow(`\n finished unzipping pageviews`))

      //filter-it down to our project only
      sh.exec(`grep '^${lang}.${project} .* desktop ' ${file} > ${tsvOut}`)
    }


    // remove lines with only one pageview
    toList()

    // cleanup old files
    // exec(`rm ${file}`)
    // exec(`rm ${tsvOut}`)
  } catch (e) {
    console.log(e)
  }
}
doit()
