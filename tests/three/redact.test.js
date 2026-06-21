import test from 'tape'
import nlp from './_lib.js'
const here = '[three/redact] '

const P = '██████████'
const phone = '███████'

const redact = (str, opts) => nlp(str).redact(opts).text()

test('redact:', function (t) {
  const arr = [
    [`spencer from 234 Main st at 423-3242 and spencer@gmail.com.`, `${P} from ${P} at ${phone} and ${P}.`],
    [`in Toronto, Canada!`, `in ${P}!`],
    [`with Dr. Miller and his pal Joe`, `with ${P} and his pal ${P}`],
    [`Mary joined Google today`, `${P} joined ${P} today`],
    [`Call John Smith at (800) 555-0000.`, `Call ${P} at ${phone}.`],
    [`Email alice@example.com for details.`, `Email ${P} for details.`],
    [`John flew to Tokyo yesterday.`, `${P} flew to ${P} yesterday.`],
    [`Paris and London are beautiful.`, `${P} and ${P} are beautiful.`],
    [`i want to go to Ohio to see George Harrison`, `i want to go to ${P} to see ${P}`],
    [`The Bill was passed by James MacCarthur`, `The Bill was passed by ${P}`],
    [`reach me at bob@test.org or carol@company.co.uk`, `reach me at ${P} or ${P}`],
    [`my number is 416-555-0199`, `my number is ${phone}`],
    [`i work with Tina Fey and Jake Gyllenhal.`, `i work with ${P} and ${P}.`],
    [`see you in Austin, Texas`, `see you in ${P}`],
    [`Francine du Plessix lives in Montreal`, `${P} lives in ${P}`],
  ]
  arr.forEach(a => {
    const [str, want] = a
    t.equal(redact(str) + '|', want + '|', here + str)
  })
  t.end()
})

test('redact-people:', function (t) {
  const arr = [
    [`Mary is in the boat.`, `${P} is in the boat.`],
    [`Rod MacDonald bought a Rod`, `${P} bought a Rod`],
    [`Matt 'the doctor' Smith lasted three seasons.`, `${P} lasted three seasons.`],
    [`Randal Kieth Orton and Dwayne Johnson had a fight.`, `${P} and ${P} had a fight.`],
    [`avril lavigne and jimi hendrix played a show.`, `${P} and ${P} played a show.`],
    [`Captain Beefheart was eccentric.`, `${P} was eccentric.`],
    [`conan and merlin met for coffee.`, `${P} and ${P} met for coffee.`],
    [`Rod L. MacDonald bought a lightening rod`, `${P} bought a lightening rod`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-places:', function (t) {
  const arr = [
    [`I went to Paris.`, `I went to ${P}.`],
    [`we are visiting Gloucestershire, before we leave`, `we are visiting ${P}, before we leave`],
    [`manitoba is nice this time of year`, `${P} is nice this time of year`],
    [`see you in Toronto, Ontario`, `see you in ${P}`],
    [`I flew to San antonio, Texas`, `I flew to ${P}`],
    [`in north africa, eastern asia, and japan`, `in ${P}, ${P}, and ${P}`],
    [`live in the Rekcjd Province`, `live in the ${P}`],
    [`Machu Picchu is stunning`, `${P} is stunning`],
    [`the Eiffel Tower is in Paris`, `the ${P} is in ${P}`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-contact:', function (t) {
  const arr = [
    [`write to spencer@gmail.com today`, `write to ${P} today`],
    [`contact support@company.io or sales@company.io`, `contact ${P} or ${P}`],
    [`my email is alice+tag@example.com`, `my email is ${P}`],
    [`call 423-3242 after noon`, `call ${phone} after noon`],
    [`Phone: +1 (555) 555-7890`, `Phone: ${phone}`],
    [`Moe Sizlak. That's right. I'm a surgeon. (800) 555-0000.`, `${P}. That's right. I'm a surgeon. ${phone}.`],
    [`fax 905-555-0100 or email hr@corp.net`, `fax ${phone} or email ${P}`],
    [`reach us at info@site.org, (212) 555-1212, or 800-555-9999`, `reach us at ${P}, ${phone}, or ${phone}`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-organizations:', function (t) {
  const arr = [
    [`Mary joined Google today`, `${P} joined ${P} today`],
    [`She works at Microsoft.`, `She works at ${P}.`],
    [`NASA launched the rocket.`, `${P} launched the rocket.`],
    [`Johnson & Johnson recalled the product.`, `${P} recalled the product.`],
    [`spencer and danny are in Paris for Google Inc and IBM`, `${P} and ${P} are in ${P} for ${P} and ${P}`],
    [`Capital One hired a new CEO.`, `${P} hired a new CEO.`],
    [`the FBI opened an investigation.`, `the ${P} opened an investigation.`],
    [`HSBC reported earnings.`, `${P} reported earnings.`],
    [`He interned at the New York Times.`, `He interned at the ${P}.`],
    [`Amazon and Apple compete fiercely.`, `${P} and ${P} compete fiercely.`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + 'org - ' + a[0])
  })
  t.end()
})

test('redact-opts:', function (t) {
  const str = 'John lives in Paris. Email john@home.com or call 555-1234.'

  t.equal(
    redact(str, { people: false }) + '|',
    `John lives in ${P}. Email ${P} or call ${phone}.|`,
    here + 'skip people'
  )
  t.equal(
    redact(str, { places: false }) + '|',
    `${P} lives in Paris. Email ${P} or call ${phone}.|`,
    here + 'skip places'
  )
  t.equal(
    redact(str, { emails: false }) + '|',
    `${P} lives in ${P}. Email john@home.com or call ${phone}.|`,
    here + 'skip emails'
  )
  t.equal(
    redact(str, { phoneNumbers: false }) + '|',
    `${P} lives in ${P}. Email ${P} or call 555-1234.|`,
    here + 'skip phones'
  )
  t.equal(
    redact(str, { people: false, places: false }) + '|',
    `John lives in Paris. Email ${P} or call ${phone}.|`,
    here + 'contact only'
  )
  t.equal(
    redact('John lives in Paris', { people: false, places: false, emails: false, phoneNumbers: false }) + '|',
    'John lives in Paris|',
    here + 'redact nothing'
  )
  t.end()
})

test('redact-negative:', function (t) {
  const arr = [
    [`The Bill was passed unanimously.`, `The Bill was passed unanimously.`],
    [`March is colder than April.`, `March is colder than April.`],
    [`Rose is a beautiful flower.`, `Rose is a beautiful flower.`],
    [`Grace under pressure is admirable.`, `Grace under pressure is admirable.`],
    [`I ate turkey for dinner.`, `I ate turkey for dinner.`],
    [`the bill comes to fifty dollars.`, `the bill comes to fifty dollars.`],
    [`Time flies like an arrow.`, `Time flies like an arrow.`],
    [`Apple pie is my favourite dessert.`, `Apple pie is my favourite dessert.`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + 'keep - ' + a[0])
  })
  t.end()
})
