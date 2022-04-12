import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/root] '

test('root misc', function (t) {
  let txt = `i've exercised four to five days per week.`
  let doc = nlp(txt).compute('root')
  let want = `i have exercise four to five day per week.`
  t.equal(doc.text('root'), want, here + 'found root form')

  txt = `he seems quicker. She's the quickest.`
  doc = nlp(txt).compute('root')
  want = `he seem quick. she is the quick.` //:/
  t.equal(doc.text('root'), want, here + 'found root comparative')
  t.end()
})

test('root text', function (t) {
  let arr = [
    // [`I've seen worse`,`i see worse`],
    [`try and pass`, `try and pass`],
    [`so I guess`, `so i guess`],
    [`Kiss you `, `kiss you`],
    [` I miss you`, `i miss you`],
    [`Focus on`, `focus on`],
    [`c'mere, gimme`, `come here give me`],
    [`more broken promises`, `more broken promise`],
    [`Address potential causes`, `address potential cause`],
    [`to express the subject.`, `to express the subject.`],
    [`C'mon`, `come on`],
    [`dismiss this`, `dismiss this`],
    // [`needed to access`, `need to access`],
    // [`to see what had happened, threw herself head foremost.`,``],
    // [`the remarkable was better`,`the remarkable was better`],
    // [`blew Curdken's hat`,``],
    // [`its great purposes.`,``],
    // [`Anyways, New Years`,``],
    // [`It's only me -- Jaqueline.`,``],
    // [`and Saturdays 11 a.m. - 3 p.m. when.`,``],
    // [`He ws quiet`, `he ws quiet`],
    [`different sizes`, `different size`],
    [`he swam to`, `he swim to`],
    [`bowls`, `bowl`],
    [`tis`, `it is`],
    [`characteristics`, `characteristic`],
    [`menus`, `menu`],
    [`tactics`, `tactic`],
    // [`others`, `other`],
    // [`yours`,``],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).compute('root')
    t.equal(doc.text('root'), a[1], here + a[0])
  })

  t.end()
})


test('lookup root', function (t) {
  let txt = `i've exercised four to five days per week.`
  let doc = nlp(txt).compute('root')
  let res = doc.lookup(['john lennon', 'exercise', 'four to five'], { form: 'root' })
  t.deepEqual(res.out('array'), ['exercised', 'four to five'], here + 'found root form')
  t.end()
})