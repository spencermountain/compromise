const test = require("tape")
const nlp = require("./_lib")

let doc = nlp("hello hello world")

// describe("edge case", () => {
test("invalid compiled regex code throws exception", (t) => {
  const regex = nlp.preCompile("hello")
  regex.prog[0].code = null
  t.throws(() => doc.strictMatch(regex), /Unsuppored Op code: null/)
  t.end()
})

// describe("plugin defines", () => {
test("extend adds functions to nlp, doc and phrase", (t) => {
  t.ok(nlp.preCompile)
  t.ok(doc.strictMatch)
  const phrase = doc.list[0]
  t.ok(phrase.strictMatch)
  t.end()
})

// describe("regex matches phrase", () => {
test("matches phrase", (t) => {
  const phrase = doc.list[0]
  t.equal(phrase.strictMatch("world").text(), "world")
  t.end()
})

test("regex - successful match sets found", (t) => {
  t.equal(doc.strictMatch("world").found, true)
  t.end()
})

test("regex - returns empty doc when no matches", (t) => {
  const match = doc.strictMatch("no match")
  t.equal(match.found, false)
  t.equal(match.text(), "")
  t.end()
})

// this particular query triggers it, match2 ends up with MATCH_END as a
// tag, probably the nested groups that allows it to get there where it
// keeps trying to match, this is fine / expected
test("match term should handle match_end or when term.tags is nullish", (t) => {
  let d = nlp("remind me to reply to @spencermountain today")
  t.equal(
    d
      .strictMatch(
        "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))"
      )
      .text(),
    d.text()
  )
  t.end()
})
