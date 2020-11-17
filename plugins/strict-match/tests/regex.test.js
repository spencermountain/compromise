const test = require("tape")
const { NLPRegexP } = require("../src/regex")

// test("NLPRegexP class - regex creation", () => {
test("creates regex successfully", (t) => {
  const str =
    "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))"
  const regex = new NLPRegexP(str)
  t.ok(regex, "isundefined")
  t.equal(regex.regex, str)
  t.ok(regex.prog, "is undefined")
  t.ok(regex.prog.length > 0)
  t.end()
})

test("thows an error on invalid regex", (t) => {
  const str =
    "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+"
  try {
    new NLPRegexP(str)
  } catch (e) {
    t.ok(e.message, "")
    t.ok(e.toString().match(/^NLP RegexP Parsing error: .*/))
  }
  t.end()
})

test("copies a regex if one already exists", (t) => {
  const str =
    "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))"
  const regexOrig = new NLPRegexP(str)
  const regex = new NLPRegexP(regexOrig)
  t.ok(regex, "isdefined")
  t.equal(regex.regex, str, "regex")
  t.equal(regex.regex, regexOrig.regex, "orig")
  t.ok(regex.prog, "prog")
  t.deepEqual(regex.prog, regexOrig.prog, "prog-orig")
  t.end()
})

test("throws an error on invalid document type", (t) => {
  const regex = new NLPRegexP("hello world")
  t.throws(() => regex.exec("hello world"))
  t.end()
})
