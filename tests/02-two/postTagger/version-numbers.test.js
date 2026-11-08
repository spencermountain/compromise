import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/version-numbers] '

test('dotted version numbers are not dates', function (t) {
  const arr = [
    // after a version word, even when it could be read as a date
    ['Version 10.11.12 is installed', '10.11.12'],
    ['version 10.11.12', '10.11.12'],
    ['the firmware 10.11.12 update', '10.11.12'],
    ['install build 10.11.12 today', '10.11.12'],
    ['upgrade to v 10.11.12', '10.11.12'],
    ['we shipped release 10.11.12', '10.11.12'],
    // no year, or no real day + month
    ['Python 3.11.4 is fast', '3.11.4'],
    ['node 18.19.0 is out', '18.19.0'],
    ['macOS 10.15.7 is old', '10.15.7'],
    ['Ubuntu 22.04.3 is out', '22.04.3'],
    ['1.0.0', '1.0.0'],
    ['1.2.3', '1.2.3'],
    ['2.30.5', '2.30.5'],
  ]
  arr.forEach(([str, target]) => {
    const m = nlp(str).match(target)
    t.equal(m.found, true, here + `found: '${str}'`)
    t.notOk(m.has('#Date'), here + `not a date: '${str}'`)
    t.ok(m.has('#Noun'), here + `noun: '${str}'`)
    // .numbers() parses these as NaN, and would corrupt them
    t.notOk(m.has('#Value'), here + `not a value: '${str}'`)
  })
  t.end()
})

test('surrounding terms of a version number', function (t) {
  const doc = nlp('Version 10.11.12 is installed')
  t.ok(doc.has('^#Noun #Noun #Copula #PastTense$'), here + 'whole sentence')
  t.end()
})

test('dotted dates are still dates', function (t) {
  const arr = [
    ['Born on 10.11.12', '10.11.12'],
    ['The meeting is 10.11.12', '10.11.12'],
    ['I was born on 12.03.1985', '12.03.1985'],
    ['on 2024.01.15 we left', '2024.01.15'],
    ['15.01.2024', '15.01.2024'],
    ['01.15.2024', '01.15.2024'],
    ['2015.08.13', '2015.08.13'],
    ['9.8.2013', '9.8.2013'],
    ['12.3.99', '12.3.99'],
    // a 4-digit year is still a date, after an ambiguous word
    ['Release 15.03.2020', '15.03.2020'],
  ]
  arr.forEach(([str, target]) => {
    t.ok(nlp(str).match(target).has('#Date'), here + `date: '${str}'`)
  })
  t.end()
})

test('plain numbers after a version word', function (t) {
  t.ok(nlp('version 3.5 is out').has('#NumericValue'), here + 'decimal')
  t.ok(nlp('version 12 is out').has('#NumericValue'), here + 'integer')
  t.end()
})
