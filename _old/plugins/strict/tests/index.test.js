const test = require("tape")
const nlp = require("./_lib")

let doc = nlp("hello hello world")

test("values", (t) => {
  t.equal(doc.strictMatch("world").text(), "world")
  t.equal(doc.strictMatch("#Noun").text(), "world")
  t.equal(doc.strictMatch(".").text(), "hello")
  t.equal(nlp("a, b, c").strictMatch("@hasComma+").text(), "a, b")
  t.end()
})

test("escaped words", (t) => {
  t.equal(nlp("#Noun").strictMatch("\\#Noun").text(), "#Noun")
  t.equal(nlp("@hasComma").strictMatch("\\@hasComma").text(), "@hasComma")
  t.end()
})

// describe("match locations", () => {
test("matches anywhere when not start of", (t) => {
  t.equal(
    nlp("hi there hello world this is a match").strictMatch("world").text(),
    "world"
  )
  t.end()
})

test("matches startOf", (t) => {
  t.equal(doc.strictMatch("^hello").text(), "hello")
  t.equal(doc.strictMatch("^world").text(), "")
  t.end()
})

test("matches endOf", (t) => {
  t.equal(doc.strictMatch("world$").text(), "world")
  t.equal(doc.strictMatch("hello$").text(), "")
  t.end()
})

// describe("value modifiers", () => {
test("one or more", (t) => {
  t.equal(nlp("hello world").strictMatch(".+").text(), "hello world")
  t.equal(nlp("hello hello world").strictMatch("hello+").text(), "hello hello")
  t.end()
})

test("zero or more", (t) => {
  t.equal(nlp("hello hello world").strictMatch("hello*").text(), "hello hello")
  t.equal(nlp("hello hello world").strictMatch("none*").text(), "")
  t.end()
})

test("zero or one", (t) => {
  t.equal(nlp("hello hello world").strictMatch("hello?").text(), "hello")
  t.equal(nlp("world").strictMatch("hello?").text(), "")
  t.end()
})
