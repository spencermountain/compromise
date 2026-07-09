import test from 'tape'
import nlp from './_lib.js'
const here = '[three/addresses] '

test('addresses-find:', function (t) {
  const arr = [
    ['i met her at 23 Park Avenue', '23 park avenue'],
    ['spencer from 234 Main st at 423-3242', '234 main st'],
    ['live at 100 Oak Street in Toronto', '100 oak street'],
    ['send it to 45 Elm Rd', '45 elm rd'],
    ['the office is at 1200 King Road', '1200 king road'],
    ['visit 7 Maple Crescent', '7 maple crescent'],
    ['drop by 88 Sunset Way', '88 sunset way'],
    ['meet at 15 Harbor Terrace', '15 harbor terrace'],
    ['123 Fake Street', '123 fake street'],
    ['42 Wallaby Way Sydney', '42 wallaby way'],
    ['55 Willow Cr', '55 willow cr'],
    ['9 Garden Tr', '9 garden tr'],
    ['500 Fifth Ave', '500 fifth ave'],
    ['500 Fifth Avenue', '500 fifth avenue'],
    ['1600 Pennsylvania Avenue NW', '1600 pennsylvania avenue'],
    ['221B Baker Street', '221b baker street'],
    ['10 Downing Street', '10 downing street'],
    ['apt 4 at 22 Birch Cr', '22 birch cr'],
    ['Ship to 99 Pine Ave, Toronto', '99 pine ave'],
    ['between 12 Oak St and 14 Oak St', '12 oak st'],
    ['888 Lakeview Crescent', '888 lakeview crescent'],
    ['333 River Road', '333 river road'],
    ['742 Evergreen Terrace Springfield', '742 evergreen terrace'],
    ['meet me at 12 oak st or 34 pine rd', '12 oak st'],
    ['300 Commerce Blvd', '300 commerce blvd'],
    ['300 Commerce Court Blvd', '300 commerce court blvd'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).addresses(0).text('normal')
    t.equal(str, a[1], here + a[0])
  })
  t.end()
})

test('addresses-array:', function (t) {
  t.deepEqual(
    nlp('i met her at 23 Park Avenue').addresses().out('array'),
    ['23 Park Avenue'],
    here + 'single address array'
  )
  t.deepEqual(
    nlp('45 elm rd and 99 pine ave').addresses().out('array'),
    ['45 elm rd', '99 pine ave'],
    here + 'two address array'
  )
  t.deepEqual(
    nlp('between 12 Oak St and 14 Oak St').addresses().out('array'),
    ['12 Oak St', '14 Oak St'],
    here + 'paired addresses array'
  )
  t.deepEqual(nlp('no address here in Paris').addresses().out('array'), [], here + 'empty array')
  t.end()
})

test('addresses-count:', function (t) {
  t.equal(nlp('45 elm rd and 99 pine ave').addresses().length, 2, here + 'two addresses')
  t.equal(nlp('between 12 Oak St and 14 Oak St').addresses().length, 2, here + 'two st addresses')
  t.equal(nlp('123 Fake Street').addresses().length, 1, here + 'one address')
  t.equal(nlp('no address here in Paris').addresses().length, 0, here + 'zero addresses')
  t.equal(
    nlp('ship to 10 Oak St, then 20 Pine Rd, and 30 Elm Ave').addresses().length,
    3,
    here + 'three addresses'
  )
  t.end()
})

test('addresses-nth:', function (t) {
  const doc = nlp('meet me at 12 oak st or 34 pine rd')
  t.equal(doc.addresses(0).text('normal'), '12 oak st', here + 'first address')
  t.equal(doc.addresses(1).text('normal'), '34 pine rd', here + 'second address')
  t.equal(doc.addresses().text('normal'), '12 oak st 34 pine rd', here + 'all addresses')
  t.end()
})

test('addresses-mixed:', function (t) {
  const doc = nlp('Call John at 234 Main st or (800) 555-0000')
  t.equal(doc.addresses().text('normal'), '234 main st', here + 'address not phone')
  t.equal(doc.phoneNumbers().found, true, here + 'phone still found')

  const doc2 = nlp('write to bob@test.org from 45 Elm Rd')
  t.equal(doc2.addresses().text('normal'), '45 elm rd', here + 'address not email')
  t.equal(doc2.emails().found, true, here + 'email still found')

  const doc3 = nlp('Mary lives at 100 Oak Street in Paris')
  t.equal(doc3.addresses().text('normal'), '100 oak street', here + 'address not place')
  t.equal(doc3.places().text('normal'), '100 Oak Street in Paris', here + 'place still found')

  t.end()
})

test('addresses-no-false-positives:', function (t) {
  const arr = [
    'no address here in Paris',
    'Main Street is busy',
    'corner of 5th and Main',
    'PO Box 123',
    '1234',
    'st louis is nice',
    '1 Infinite Loop',
    'Suite 200',
    'the bill comes to fifty dollars',
    'Rose lives on Rose Street',
  ]
  arr.forEach(function (str) {
    t.equal(nlp(str).addresses().found, false, here + 'not-address: ' + str)
  })
  t.end()
})

test('addresses-suffixes:', function (t) {
  const arr = [
    ['1 Foo st', '1 foo st'],
    ['2 Foo street', '2 foo street'],
    ['3 Foo rd', '3 foo rd'],
    ['4 Foo road', '4 foo road'],
    ['5 Foo cr', '5 foo cr'],
    ['6 Foo crescent', '6 foo crescent'],
    ['7 Foo way', '7 foo way'],
    ['8 Foo tr', '8 foo tr'],
    ['9 Foo terrace', '9 foo terrace'],
    ['10 Foo ave', '10 foo ave'],
    ['11 Foo avenue', '11 foo avenue'],
  ]
  arr.forEach(function (a) {
    t.equal(nlp(a[0]).addresses().text('normal'), a[1], here + a[0])
  })
  t.end()
})

test('addresses-sentences:', function (t) {
  const arr = [
    ['I live at 4 main st.', '4 main st'],
    ['Please deliver to 77 King St!', '77 king st'],
    ['Is it near 19 Birch Rd?', '19 birch rd'],
    ['We moved from 6 Oak Ave to 8 Pine Ave.', '6 oak ave'],
  ]
  arr.forEach(function (a) {
    t.equal(nlp(a[0]).addresses(0).text('normal'), a[1], here + a[0])
  })
  t.end()
})

test('addresses-redact-overlap:', function (t) {
  const str = 'spencer from 234 Main st at 423-3242 and spencer@gmail.com.'
  const doc = nlp(str)
  t.equal(doc.addresses().text('normal'), '234 main st', here + 'redact sample address')
  t.equal(doc.redact({ addresses: false }).addresses().text('normal'), '234 main st', here + 'skip address redact')
  t.end()
})

test('addresses-edge:', function (t) {
  const arr = [
    ['742 Evergreen Terrace', '742 evergreen terrace'],
    ['99 Pine Ave, Toronto, Canada', '99 pine ave'],
    ['I live at 4 main st.', '4 main st'],
    ['300 Commerce Blvd', '300 commerce blvd'],
    ['22B Main Street', '22b main street'],
    ['Unit 5, 18 Cedar Way', '18 cedar way'],
    ['north of 100 King St', '100 king st'],
    ['same as 250 Park Ave', '250 park ave'],
  ]
  arr.forEach(function (a) {
    t.equal(nlp(a[0]).addresses(0).text('normal'), a[1], here + a[0])
  })
  t.end()
})
