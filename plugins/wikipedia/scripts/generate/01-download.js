import wget from 'node-wget-promise'
import { yellow } from 'colorette'
import sh from 'shelljs'
const file = `./files/pageviews.tsv`

let d = new Date()
const month = `${d.getMonth() + 1}`.padStart(2, '0')
const year = d.getFullYear()

// create the filename for the last dump
const getDate = () => {
  let d = new Date()
  d.setDate(d.getDate() - 10) // do yesterday
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const date = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}${month}${date}`
}

const getIt = async function () {
  // download dump
  console.log(yellow(`\n-- downloading pageview dataset:   (~5 mins)--`))
  const url = `https://dumps.wikimedia.org/other/pageview_complete/${year}/${year}-${month}/pageviews-${getDate()}-user.bz2`
  await wget(url, {
    output: file + '.bz2',
  })
  // unzip
  console.log(yellow(`\n--- unzipping pageviews data  (~4 mins) --`))
  sh.exec(`bzip2 -d  ${file}.bz2`)
  console.log(yellow(`\n finished unzipping pageviews`))

  // sh.exec(`rm  ${file}.bz2`)

}

export default getIt
