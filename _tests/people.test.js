const test = require('tape')
const nlp = require('./_lib')

test('people:', function (t) {
  let doc = nlp('Mary is in the boat. Nancy is in the boat. Fred is in the boat. Jack is too.')
  let arr = doc.people().toLowerCase().out('array')
  t.deepEqual(arr, ['mary', 'nancy', 'fred', 'jack'], 'people-easy')

  doc = nlp('jean jacket. jean Slkje')
  arr = doc.people().toLowerCase().out('array')
  t.deepEqual(arr, ['jean slkje'], 'people-context')

  doc = nlp('The Bill was passed by James MacCarthur')
  arr = doc.people().toLowerCase().out('array')
  t.deepEqual(arr, ['james maccarthur'], 'the-bill')

  doc = nlp('Rod MacDonald bought a Rod')
  arr = doc.people().toLowerCase().out('array')
  t.deepEqual(arr, ['rod macdonald'], 'the-rod-1')

  doc = nlp('Rod L. MacDonald bought a lightening rod')
  arr = doc.people().toLowerCase().out('text')
  t.deepEqual(arr, 'rod l. macdonald', 'the-rod-2')

  doc = nlp('Francine du Plessix')
  arr = doc.people().text()
  t.deepEqual(arr, 'Francine du Plessix', 'name-du-person')

  doc = nlp("Matt 'the doctor' Smith lasted three seasons.")
  arr = doc.people().toLowerCase().out()
  t.deepEqual(arr, "matt 'the doctor' smith", 'nickname-1')

  doc = nlp("Randal Kieth Orton and Dwayne 'the rock' Johnson had a really funny fight.")
  t.equal(doc.people(0).out('normal'), 'randal kieth orton', 'nickname-2a')
  t.equal(doc.people(1).out('normal'), 'dwayne the rock johnson', 'nickname-2b')

  doc = nlp('i work with Tina Fey and Jake Gyllenhal.')
  let m = doc.people()
  t.equal(m.eq(0).text(), 'Tina Fey')
  t.equal(m.eq(1).text(), 'Jake Gyllenhal')

  t.end()
})

test('people false-positives:', function (t) {
  let arr = [
    `op assessment`,
    `may`,
    `liberty`,
    `Service.`,
    `CATS Clinic`,
    `CATS Team.`,
    `Mount  Vernon`,
    `CCP`,
    `GI Team`,
    `Breast`,
    `lady's shoulder.`,
    `secretary's contact`,
    `Limb CATS Clinic`,
    `b.d. In`,
    `Spinal `, //hmm
    `booked her for TURBT  +/-Mitomycin C.`, //hmm
    `lady's`,
    `MRI Brain`,
    `P.S. Dear`,
    `(AP`,
    // `Barrett's disease`,
    // `TIA`,
    // `Sam myself`,
    `she may need to be`,
    `she  may have to wait`,
    `we  may  need  to  cancel`,
    `We  may  need  to  revisit  the  diagnosis`,
    `which  I  think  may  be  arising`,
    // `Mr Sean Malay, Spinal Surgeon`,
    `onto the Spinal CATS Service`,
    // `Vitamin D.`,
    // `may`,
    // `ACE`,
    // `gene`,
    // `Jennifer  antibiotics`,
    // `rheumatoid factor, ANA, ENA, CCP antibody, ESR, CRP, etc.`,
    // `in our X-ray Uro-radiology`,
  ]
  arr.forEach(str => {
    let doc = nlp(str)
    let people = doc.people().out('array')
    t.deepEqual(people, [], str)
  })

  t.end()
})
