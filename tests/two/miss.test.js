import test from 'tape'
import nlp from './_lib.js'
const here = '[two/miss] '

const arr = [
  [`coolcom`, '#Url'],
  [`egg./com`, '#Url'],
  [`foo,org`, '#Url'],
  [`.com`, '#Url'],
  [`.com/path`, '#Url'],

  [`sasdf@sasdf.t`, '#Email'],
  [`sasdf@sasdft`, '#Email'],
  [`sasdfsasdft.com`, '#Email'],
  [`@sasdft.com`, '#Email'],
  [`_@_._`, '#Email'],
  [`sas df@sasdf.com`, '^#Email'],
  [`sasdf@sa sdf.com`, '#Email'],

  [`# l`, '#HashTag'],
  [`l#l`, '#HashTag'],
  [`walk in on`, '#Verb #Preposition #Preposition'],
  [`standing out in`, '#Verb #Preposition #Preposition'],
  // [``, ''],
]

test('no-match:', function (t) {
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    let msg = `'${(a[0] + "' ").padEnd(20, '.')}  - '${a[1]}'`
    t.equal(doc.has(a[1]), false, here + msg)
  })
  t.end()
})
