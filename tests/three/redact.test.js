import test from 'tape'
import nlp from './_lib.js'
const here = '[three/redact] '

const blockStr = '██████████'

const redact = (str, opts) => nlp(str).redact(opts).text()

test('redact:', function (t) {
  const arr = [
    [`spencer from 234 Main st at 423-3242 and spencer@gmail.com.`, `${blockStr} from ${blockStr} at ${blockStr} and ${blockStr}.`],
    [`in Toronto, Canada!`, `in ${blockStr}!`],
    [`with Dr. Miller and his pal Joe`, `with ${blockStr} and his pal ${blockStr}`],
    [`Mary joined Google today`, `${blockStr} joined ${blockStr} today`],
    [`Call John Smith at (800) 555-0000.`, `Call ${blockStr} at ${blockStr}.`],
    [`Email alice@example.com for details.`, `Email ${blockStr} for details.`],
    [`John flew to Tokyo yesterday.`, `${blockStr} flew to ${blockStr} yesterday.`],
    [`Paris and London are beautiful.`, `${blockStr} and ${blockStr} are beautiful.`],
    [`i want to go to Ohio to see George Harrison`, `i want to go to ${blockStr} to see ${blockStr}`],
    [`The Bill was passed by James MacCarthur`, `The Bill was passed by ${blockStr}`],
    [`reach me at bob@test.org or carol@company.co.uk`, `reach me at ${blockStr} or ${blockStr}`],
    [`my number is 416-555-0199`, `my number is ${blockStr}`],
    [`i work with Tina Fey and Jake Gyllenhal.`, `i work with ${blockStr} and ${blockStr}.`],
    [`see you in Austin, Texas`, `see you in ${blockStr}`],
    [`Francine du Plessix lives in Montreal`, `${blockStr} lives in ${blockStr}`],
  ]
  arr.forEach(a => {
    const [str, want] = a
    t.equal(redact(str) + '|', want + '|', here + str)
  })
  t.end()
})

test('redact-people:', function (t) {
  const arr = [
    [`Mary is in the boat.`, `${blockStr} is in the boat.`],
    [`Rod MacDonald bought a Rod`, `${blockStr} bought a Rod`],
    [`Dr. Matt G Smith lasted three seasons.`, `${blockStr} lasted three seasons.`],
    [`Randal Kieth Orton and Dwayne Johnson had a fight.`, `${blockStr} and ${blockStr} had a fight.`],
    [`avril lavigne and jimi hendrix played a show.`, `${blockStr} and ${blockStr} played a show.`],
    [`Captain Beefheart was eccentric.`, `${blockStr} was eccentric.`],
    [`conan and merlin met for coffee.`, `${blockStr} and ${blockStr} met for coffee.`],
    [`Rod L. MacDonald bought a lightening rod`, `${blockStr} bought a lightening rod`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-places:', function (t) {
  const arr = [
    [`I went to Paris.`, `I went to ${blockStr}.`],
    [`we are visiting Gloucestershire, before we leave`, `we are visiting ${blockStr}, before we leave`],
    [`manitoba is nice this time of year`, `${blockStr} is nice this time of year`],
    [`see you in Toronto, Ontario`, `see you in ${blockStr}`],
    [`I flew to San antonio, Texas`, `I flew to ${blockStr}`],
    [`in north africa, eastern asia, and japan`, `in ${blockStr}, ${blockStr}, and ${blockStr}`],
    [`live in the Rekcjd Province`, `live in the ${blockStr}`],
    [`Machu Picchu is stunning`, `${blockStr} is stunning`],
    [`the Eiffel Tower is in Paris`, `the ${blockStr} is in ${blockStr}`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-contact:', function (t) {
  const arr = [
    [`write to spencer@gmail.com today`, `write to ${blockStr} today`],
    [`contact support@company.io or sales@company.io`, `contact ${blockStr} or ${blockStr}`],
    [`my email is alice+tag@example.com`, `my email is ${blockStr}`],
    [`call 423-3242 after noon`, `call ${blockStr} after noon`],
    [`Phone: +1 (555) 555-7890`, `Phone: ${blockStr}`],
    [`Moe Sizlak. That's right. I'm a surgeon. (800) 555-0000.`, `${blockStr}. That's right. I'm a surgeon. ${blockStr}.`],
    [`fax 905-555-0100 or email hr@corp.net`, `fax ${blockStr} or email ${blockStr}`],
    [`reach us at info@site.org, (212) 555-1212, or 800-555-9999`, `reach us at ${blockStr}, ${blockStr}, or ${blockStr}`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + a[0])
  })
  t.end()
})

test('redact-organizations:', function (t) {
  const arr = [
    [`Mary joined Google today`, `${blockStr} joined ${blockStr} today`],
    [`She works at Microsoft.`, `She works at ${blockStr}.`],
    [`NASA launched the rocket.`, `${blockStr} launched the rocket.`],
    [`Johnson & Johnson recalled the product.`, `${blockStr} recalled the product.`],
    [`spencer and danny are in Paris for Google Inc and IBM`, `${blockStr} and ${blockStr} are in ${blockStr} for ${blockStr} and ${blockStr}`],
    [`Capital One hired a new CEO.`, `${blockStr} hired a new CEO.`],
    [`the bill comes to fifty dollars.`, `the bill comes to ${blockStr}.`],
    [`the FBI opened an investigation.`, `the ${blockStr} opened an investigation.`],
    [`HSBC reported earnings.`, `${blockStr} reported earnings.`],
    [`He interned at the New York Times.`, `He interned at the ${blockStr}.`],
    [`Amazon Inc and Apple.com compete fiercely.`, `${blockStr} and ${blockStr} compete fiercely.`],
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
    `John lives in ${blockStr}. Email ${blockStr} or call ${blockStr}.|`,
    here + 'skip people'
  )
  t.equal(
    redact(str, { places: false }) + '|',
    `${blockStr} lives in Paris. Email ${blockStr} or call ${blockStr}.|`,
    here + 'skip places'
  )
  t.equal(
    redact(str, { emails: false }) + '|',
    `${blockStr} lives in ${blockStr}. Email john@home.com or call ${blockStr}.|`,
    here + 'skip emails'
  )
  t.equal(
    redact(str, { phoneNumbers: false }) + '|',
    `${blockStr} lives in ${blockStr}. Email ${blockStr} or call 555-1234.|`,
    here + 'skip phones'
  )
  t.equal(
    redact(str, { people: false, places: false }) + '|',
    `John lives in Paris. Email ${blockStr} or call ${blockStr}.|`,
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
    [`Time flies like an arrow.`, `Time flies like an arrow.`],
    [`Apple pie is my favourite dessert.`, `Apple pie is my favourite dessert.`],
  ]
  arr.forEach(a => {
    t.equal(redact(a[0]) + '|', a[1] + '|', here + 'keep - ' + a[0])
  })
  t.end()
})
