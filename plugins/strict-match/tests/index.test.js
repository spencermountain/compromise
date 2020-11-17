import NLP from "compromise"
import compromise_match2 from "../src/index"
import { NLPRegexParseError } from "../src/index"

// describe("match2 plugin", () => {
const nlp = NLP.clone().extend(compromise_match2)
let doc = null

beforeEach(() => {
  doc = nlp("hello hello world")
})

describe("edge case", () => {
  it("invalid compiled regex code throws exception", () => {
    const regex = nlp.compileRegex("hello")
    regex.prog[0].code = null
    expect(() => doc.match2(regex)).toThrow(/Unsuppored Op code: null/)
  })
})

describe("plugin defines", () => {
  it("extend adds match2 functions to nlp, doc, and phrase", () => {
    expect(nlp.compileRegex).toBeDefined()
    expect(doc.compileRegex).toBeDefined()
    expect(doc.match2).toBeDefined()
    expect(doc.match2).toBeDefined()

    const phrase = doc.list[0]
    expect(phrase.match2).toBeDefined()
  })
})

describe("regex matches phrase", () => {
  it("matches phrase", () => {
    const phrase = doc.list[0]
    expect(phrase.match2("world").text()).toEqual("world")
  })
})

describe("handles previous bugs", () => {
  it("match term should handle match_end or when term.tags is nullish", () => {
    // this particular query triggers it, match2 ends up with MATCH_END as a
    // tag, probably the nested groups that allows it to get there where it
    // keeps trying to match, this is fine / expected
    doc = nlp("remind me to reply to @spencermountain today")
    expect(
      doc
        .match2(
          "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))"
        )
        .text()
    ).toEqual(doc.text())
  })
})

describe("regex matches doc", () => {
  it("successful match sets found", () => {
    expect(doc.match2("world").found).toBe(true)
  })

  it("returns empty doc when no matches", () => {
    const match = doc.match2("no match")
    expect(match.found).toBe(false)
    expect(match.text()).toBe("")
  })

  describe("values", () => {
    it("word", () => {
      expect(doc.match2("world").text()).toEqual("world")
    })

    it("tag", () => {
      expect(doc.match2("#Noun").text()).toEqual("world")
    })

    it("any", () => {
      expect(doc.match2(".").text()).toEqual("hello")
    })

    it("mathod", () => {
      expect(nlp("a, b, c").match2("@hasComma+").text()).toEqual("a, b")
    })

    describe("escaped words", () => {
      it("tag", () => {
        expect(nlp("#Noun").match2("\\#Noun").text()).toEqual("#Noun")
      })

      it("methods", () => {
        expect(nlp("@hasComma").match2("\\@hasComma").text()).toEqual(
          "@hasComma"
        )
      })
    })
  })

  describe("match locations", () => {
    it("matches anywhere when not start of", () => {
      expect(
        nlp("hi there hello world this is a match").match2("world").text()
      ).toEqual("world")
    })

    it("matches startOf", () => {
      expect(doc.match2("^hello").text()).toEqual("hello")
      expect(doc.match2("^world").text()).toEqual("")
    })

    it("matches endOf", () => {
      expect(doc.match2("world$").text()).toEqual("world")
      expect(doc.match2("hello$").text()).toEqual("")
    })
  })

  describe("value modifiers", () => {
    it("one or more", () => {
      expect(nlp("hello world").match2(".+").text()).toEqual("hello world")
      expect(nlp("hello hello world").match2("hello+").text()).toEqual(
        "hello hello"
      )
    })

    it("zero or more", () => {
      expect(nlp("hello hello world").match2("hello*").text()).toEqual(
        "hello hello"
      )
      expect(nlp("hello hello world").match2("none*").text()).toEqual("")
    })

    it("zero or one", () => {
      expect(nlp("hello hello world").match2("hello?").text()).toEqual("hello")
      expect(nlp("world").match2("hello?").text()).toEqual("")
    })


    
