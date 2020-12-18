const test = require("tape")
const nlp = require("./_lib")

let doc = nlp("hello hello world")

test("match exact", (t) => {
  t.equal(doc.strictMatch("hello{1}?").text(), "hello")
  t.equal(doc.strictMatch("hello{1,1}?").text(), "hello")
  t.equal(doc.strictMatch("hello{2}?").text(), "hello hello")
  t.equal(doc.strictMatch("hello{2,2}?").text(), "hello hello")
  t.equal(doc.strictMatch("hello{3}?").text(), "")
  t.end()
})

test("match minimum", (t) => {
  t.equal(doc.strictMatch("hello{1,}?").text(), "hello")
  t.equal(doc.strictMatch("hello{2,}?").text(), "hello hello")
  t.equal(doc.strictMatch("hello{1,}?").text(), "hello")
  t.equal(doc.strictMatch("hello{2,}? world").text(), "hello hello world")
  t.end()
})

test("match maximum", (t) => {
  t.equal(doc.strictMatch("hello{,1}? world").text(), "hello world")
  t.equal(doc.strictMatch("hello{,2}?").text(), "")
  t.equal(doc.strictMatch("hello{,1}?").text(), "")
  t.end()
})

test("match minimum and maximum", (t) => {
  t.equal(doc.strictMatch("hello{1,2}?").text(), "hello")
  t.equal(doc.strictMatch("hello{0,2}?").text(), "")
  t.equal(doc.strictMatch("hello{0,1}?").text(), "")
  t.equal(doc.strictMatch("hello{0,1}? world").text(), "hello world")
  t.equal(doc.strictMatch("hello{0,2}? world").text(), "hello hello world")
  t.end()
})

test("skip zero range", (t) => {
  t.equal(doc.strictMatch("hello{0}?").text(), "")
  t.equal(doc.strictMatch("hello hello{0}?").text(), "hello")
  t.equal(doc.strictMatch("hello{0}? world").text(), "world")
  t.end()
})

test("throws error on invalid range", (t) => {
  try {
    t.throws(() => doc.strictMatch("hello{,}?"), null, "err")
  } catch (e) {
    t.ok(true, "threw failure 1")
  }
  try {
    t.throws(() => doc.strictMatch("hello{,-1}?"), null, "err")
  } catch (e) {
    t.ok(true, "threw failure 3")
  }
  try {
    t.throws(() => doc.strictMatch("hello{2,1}?"), null, "err")
  } catch (e) {
    t.ok(true, "threw failure 3")
  }
  t.end()
})

test("non greedy - one or more", (t) => {
  t.equal(nlp("hello hello world").strictMatch("hello+?").text(), "hello")
  t.equal(
    nlp("hello hello world").strictMatch("hello+? world").text(),
    "hello hello world"
  )
  t.end()
})

test("non greedy - zero or more", (t) => {
  t.equal(nlp("hello hello world").strictMatch("hello*?").text(), "")
  t.equal(
    nlp("hello hello world").strictMatch("hello*? world").text(),
    "hello hello world"
  )
  t.end()
})

test("non greedy - zero or one", (t) => {
  t.equal(nlp("hello hello world").strictMatch("hello??").text(), "")
  t.equal(
    nlp("hello hello world").strictMatch("hello?? world").text(),
    "hello world"
  )
  t.end()
})

test("match exact", (t) => {
  t.equal(doc.strictMatch("hello{1}").text(), "hello")
  t.equal(doc.strictMatch("hello{1,1}").text(), "hello")
  t.equal(doc.strictMatch("hello{2}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{2,2}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{3}").text(), "")
  t.end()
})

test("match minimum", (t) => {
  t.equal(doc.strictMatch("hello{1,}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{2,}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{1,}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{2,} world").text(), "hello hello world")
  t.end()
})

test("match maximum", (t) => {
  t.equal(doc.strictMatch("hello{,1} world").text(), "hello world")
  t.equal(doc.strictMatch("hello{,2}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{,1}").text(), "hello")
  t.end()
})

test("match minimum and maximum", (t) => {
  t.equal(doc.strictMatch("hello{1,2}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{0,2}").text(), "hello hello")
  t.equal(doc.strictMatch("hello{0,1}").text(), "hello")
  t.equal(doc.strictMatch("hello{0,1} world").text(), "hello world")
  t.equal(doc.strictMatch("hello{0,2} world").text(), "hello hello world")
  t.end()
})

test("skip zero range", (t) => {
  t.equal(doc.strictMatch("hello{0}").text(), "")
  t.equal(doc.strictMatch("hello hello{0}").text(), "hello")
  t.equal(doc.strictMatch("hello{0} world").text(), "world")
  t.end()
})

test("throws error on invalid range", (t) => {
  try {
    t.throws(
      () => doc.strictMatch("hello{,}"),
      /Range min or max must be defined/
    )
  } catch (e) {
    t.ok(true, "throw-1")
  }
  try {
    t.throws(() => doc.strictMatch("hello{2,1}"))
  } catch (e) {
    t.ok(true, "throw-2")
  }
  try {
    t.throws(() => doc.strictMatch("hello{,-1}"))
  } catch (e) {
    t.ok(true, "throw-1")
  }
  t.end()
})
