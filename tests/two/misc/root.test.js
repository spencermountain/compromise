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


test('root match', function (t) {
  let doc = nlp('five works of art')
  t.equal(doc.has('{work}'), true, here + '{work}')
  t.equal(doc.has('{work/noun}'), true, here + '{work/noun}')
  t.equal(doc.has('{work/verb}'), false, here + '{work/verb}')
  t.equal(doc.has('{work/adjective}'), false, here + '{work/adjective}')

  doc = nlp('i work at 8')
  t.equal(doc.has('{work}'), true, here + '{work} vb')
  t.equal(doc.has('{work/noun}'), false, here + '{work/noun} vb')
  t.equal(doc.has('{work/verb}'), true, here + '{work/verb} vb')
  t.equal(doc.has('{work/adjective}'), false, here + '{work/adjective} vb')
  doc = nlp('i worked at 8')
  t.equal(doc.has('{work}'), true, here + '{work} vbd')
  t.equal(doc.has('{work/noun}'), false, here + '{work/noun} vbd')
  t.equal(doc.has('{work/verb}'), true, here + '{work/verb} vbd')
  t.equal(doc.has('{work/adjective}'), false, here + '{work/adjective} vbd')
  doc = nlp('i am working at 8')
  t.equal(doc.has('{work}'), true, here + '{work} vbg')
  t.equal(doc.has('{work/noun}'), false, here + '{work/noun} vbg')
  t.equal(doc.has('{work/verb}'), true, here + '{work/verb} vbg')
  t.equal(doc.has('{work/adjective}'), false, here + '{work/adjective} vbg')

  doc = nlp('he was sweet')
  t.equal(doc.has('{sweet}'), true, here + '{sweet} jj')
  t.equal(doc.has('{sweet/noun}'), false, here + '{sweet/noun} jj')
  t.equal(doc.has('{sweet/verb}'), false, here + '{sweet/verb} jj')
  t.equal(doc.has('{sweet/adjective}'), true, here + '{sweet/adjective} jj')
  doc = nlp('he was sweeter')
  t.equal(doc.has('{sweet}'), true, here + '{sweet} jjr')
  t.equal(doc.has('{sweet/noun}'), false, here + '{sweet/noun} jjr')
  t.equal(doc.has('{sweet/verb}'), false, here + '{sweet/verb} jjr')
  t.equal(doc.has('{sweet/adjective}'), true, here + '{sweet/adjective} jjr')
  doc = nlp('he sweetly sang')
  t.equal(doc.has('{sweet}'), true, here + '{sweet} rb')
  t.equal(doc.has('{sweet/noun}'), false, here + '{sweet/noun} rb')
  t.equal(doc.has('{sweet/verb}'), false, here + '{sweet/verb} rb')
  t.equal(doc.has('{sweet/adjective}'), false, here + '{sweet/adjective} rb')

  t.end()
})

test('sense match', function (t) {
  let doc = nlp('the stool was brown')
  doc.docs[0][1].sense = 'chair'
  t.equal(doc.has('{stool}'), true, here + '{stool}')
  t.equal(doc.has('{stool/Noun}'), true, here + '{stool/Noun}')
  t.equal(doc.has('{stool/Noun/poop}'), false, here + '{stool/Noun/poop}')
  t.equal(doc.has('{stool/Noun/chair}'), true, here + '{stool/Noun/chair}')
  t.end()
})