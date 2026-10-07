import test from 'tape'
import nlp from '../../lib/two.js'
const here = '[two/misc/country-acronyms] '

test(here + 'country initialisms retain both tags', t => {
  for (const country of ['UK', 'USA', 'USSR', 'U.K.', 'U.S.A.', 'U.S.S.R.']) {
    const doc = nlp('Visitors arrived from the ' + country)
    const place = doc.match('#Country')
    t.equal(place.length, 1, here + country + ' remains a country')
    t.ok(place.has('#Acronym'), here + country + ' is also an acronym')
  }
  t.end()
})

test(here + 'capitalized country names and pronouns are not initialisms', t => {
  for (const country of ['Canada', 'CANADA', 'Japan', 'JAPAN', 'Chad', 'CHAD']) {
    const doc = nlp('Visitors arrived from ' + country)
    t.notOk(doc.has('#Acronym'), here + country + ' is not an acronym')
  }
  t.notOk(nlp('They saw us.').has('#Country'), here + 'us remains a pronoun')
  t.end()
})
