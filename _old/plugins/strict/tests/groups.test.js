const test = require("tape")
const nlp = require("./_lib")

let doc = nlp("hello hello world")

test("matches", (t) => {
  const match = nlp("hello world today").strictMatch("hello (world)?")
  t.equal(match.text(), "hello world")
  t.equal(match.group(0).text(), "world")
  t.deepEqual(Object.keys(match.groups()), ["0"])
  t.end()
})

test("matches nested groups", (t) => {
  const match = doc.strictMatch("(hello (hello+ world+)+)+")
  t.equal(Object.keys(match.groups()).length, 2)
  t.equal(match.groups(0).text(), "hello hello world")
  t.equal(match.groups(1).text(), "hello world")
  t.end()
})

test("matches optional groups", (t) => {
  const match = nlp("hello").strictMatch("hello (world)?")
  t.equal(match.text(), "hello")
  t.equal(match.group(0).text(), "")
  t.deepEqual(match.groups(), {})
  t.end()
})

test("matches groups with no matches", (t) => {
  const match = nlp("hello").strictMatch("hello (world?)")
  t.equal(match.text(), "hello")
  t.equal(match.group(0).text(), "")
  t.deepEqual(Object.keys(match.groups()), ["0"])
  t.end()
})

test("captures the group matches", (t) => {
  const match = doc.strictMatch("(hello+) world")
  t.equal(match.text(), "hello hello world")
  t.equal(match.groups(0).text(), "hello hello")
  t.deepEqual(Object.keys(match.groups()), ["0"])
  t.end()
})

test("matches any pipe seperated value statements, OR operator", (t) => {
  const match = doc.strictMatch("(world|hello)")
  t.equal(match.text(), "hello")
  t.equal(match.group(0).text(), "hello")
  t.deepEqual(Object.keys(match.groups()), ["0"])
  t.end()
})

test("only saves the last matched value for group", (t) => {
  const match = doc.strictMatch("(world|hello)+")
  t.equal(match.text(), "hello hello world")
  t.equal(match.group(0).text(), "world")
  t.deepEqual(Object.keys(match.groups()), ["0"])
  t.end()
})

// test("named capture groups", () => {
test("matches and saves named group", (t) => {
  const text = nlp("hello world")
    .strictMatch("(?P<what>hello)")
    .groups("what")
    .text()
  t.equal(text, "hello")
  t.end()
})

// test("non-capturing group", () => {
test("matches but does not save non-capturing group", (t) => {
  const match = doc.strictMatch("hello (?:world)")
  t.equal(match.text(), "hello world")
  t.deepEqual(match.groups(), {})
  t.end()
})

// test("lookahead group", () => {
test("asserts matches ahead and does not consume token", (t) => {
  const match = doc.strictMatch("hello (?=world) .")
  t.equal(match.text(), "hello world")
  t.deepEqual(match.groups(), {})
  t.end()
})

// test("negative lookahead group", () => {
test("asserts does not match ahead and does not consume token", (t) => {
  const match = doc.strictMatch("hello (?!hello) .")
  t.equal(match.text(), "hello world")
  t.deepEqual(match.groups(), {})
  t.end()
})
