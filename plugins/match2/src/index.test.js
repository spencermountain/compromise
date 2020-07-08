import NLP from "compromise";
import compromise_match2 from "./index";
import { NLPRegexParseError } from "./index";

describe("match2 plugin", () => {
  const nlp = NLP.clone().extend(compromise_match2);
  let doc = null;

  beforeEach(() => {
    doc = nlp("hello hello world");
  });

  describe("edge case", () => {
    it("invalid compiled regex code throws exception", () => {
      const regex = nlp.compileRegex("hello");
      regex.prog[0].code = null;
      expect(() => doc.match2(regex)).toThrow(/Unsuppored Op code: null/);
    });
  });

  describe("plugin defines", () => {
    it("extend adds match2 functions to nlp, doc, and phrase", () => {
      expect(nlp.compileRegex).toBeDefined();
      expect(doc.compileRegex).toBeDefined();
      expect(doc.match2).toBeDefined();
      expect(doc.match2).toBeDefined();

      const phrase = doc.list[0];
      expect(phrase.match2).toBeDefined();
    });
  });

  describe("regex matches phrase", () => {
    it("matches phrase", () => {
      const phrase = doc.list[0];
      expect(phrase.match2("world").text()).toEqual("world");
    });
  });

  describe("regex matches doc", () => {
    it("successful match sets found", () => {
      expect(doc.match2("world").found).toBe(true);
    });

    it("returns empty doc when no matches", () => {
      const match = doc.match2("no match");
      expect(match.found).toBe(false);
      expect(match.text()).toBe("");
    });

    describe("values", () => {
      it("word", () => {
        expect(doc.match2("world").text()).toEqual("world");
      });

      it("tag", () => {
        expect(doc.match2("#Noun").text()).toEqual("world");
      });

      it("any", () => {
        expect(doc.match2(".").text()).toEqual("hello");
      });
    });

    describe("match locations", () => {
      it("matches anywhere when not start of", () => {
        expect(
          nlp("hi there hello world this is a match").match2("world").text()
        ).toEqual("world");
      });

      it("matches startOf", () => {
        expect(doc.match2("^hello").text()).toEqual("hello");
        expect(doc.match2("^world").text()).toEqual("");
      });

      it("matches endOf", () => {
        expect(doc.match2("world$").text()).toEqual("world");
        expect(doc.match2("hello$").text()).toEqual("");
      });
    });

    describe("value modifiers", () => {
      it("one or more", () => {
        expect(nlp("hello world").match2(".+").text()).toEqual("hello world");
        expect(nlp("hello hello world").match2("hello+").text()).toEqual(
          "hello hello"
        );
      });

      it("zero or more", () => {
        expect(nlp("hello hello world").match2("hello*").text()).toEqual(
          "hello hello"
        );
        expect(nlp("hello hello world").match2("none*").text()).toEqual("");
      });

      it("zero or one", () => {
        expect(nlp("hello hello world").match2("hello?").text()).toEqual(
          "hello"
        );
        expect(nlp("world").match2("hello?").text()).toEqual("");
      });

      describe("ranges", () => {
        describe("greedy", () => {
          it("match exact", () => {
            expect(doc.match2("hello{1}").text()).toEqual("hello");
            expect(doc.match2("hello{1,1}").text()).toEqual("hello");
            expect(doc.match2("hello{2}").text()).toEqual("hello hello");
            expect(doc.match2("hello{2,2}").text()).toEqual("hello hello");
            expect(doc.match2("hello{3}").text()).toEqual("");
          });

          it("match minimum", () => {
            expect(doc.match2("hello{1,}").text()).toEqual("hello hello");
            expect(doc.match2("hello{2,}").text()).toEqual("hello hello");
            expect(doc.match2("hello{1,}").text()).toEqual("hello hello");
            expect(doc.match2("hello{2,} world").text()).toEqual(
              "hello hello world"
            );
          });

          it("match maximum", () => {
            expect(doc.match2("hello{,1} world").text()).toEqual("hello world");
            expect(doc.match2("hello{,2}").text()).toEqual("hello hello");
            expect(doc.match2("hello{,1}").text()).toEqual("hello");
          });

          it("match minimum and maximum", () => {
            expect(doc.match2("hello{1,2}").text()).toEqual("hello hello");
            expect(doc.match2("hello{0,2}").text()).toEqual("hello hello");
            expect(doc.match2("hello{0,1}").text()).toEqual("hello");
            expect(doc.match2("hello{0,1} world").text()).toEqual(
              "hello world"
            );
            expect(doc.match2("hello{0,2} world").text()).toEqual(
              "hello hello world"
            );
          });

          it("skip zero range", () => {
            expect(doc.match2("hello{0}").text()).toEqual("");
            expect(doc.match2("hello hello{0}").text()).toEqual("hello");
            expect(doc.match2("hello{0} world").text()).toEqual("world");
          });

          it("throws error on invalid range", () => {
            expect(() => doc.match2("hello{,}")).toThrow(
              /Range min or max must be defined/
            );
            expect(() => doc.match2("hello{2,1}")).toThrow(NLPRegexParseError);
            expect(() => doc.match2("hello{,-1}")).toThrow(NLPRegexParseError);
          });
        });

        describe("non greedy", () => {
          it("match exact", () => {
            expect(doc.match2("hello{1}?").text()).toEqual("hello");
            expect(doc.match2("hello{1,1}?").text()).toEqual("hello");
            expect(doc.match2("hello{2}?").text()).toEqual("hello hello");
            expect(doc.match2("hello{2,2}?").text()).toEqual("hello hello");
            expect(doc.match2("hello{3}?").text()).toEqual("");
          });

          it("match minimum", () => {
            expect(doc.match2("hello{1,}?").text()).toEqual("hello");
            expect(doc.match2("hello{2,}?").text()).toEqual("hello hello");
            expect(doc.match2("hello{1,}?").text()).toEqual("hello");
            expect(doc.match2("hello{2,}? world").text()).toEqual(
              "hello hello world"
            );
          });

          it("match maximum", () => {
            expect(doc.match2("hello{,1}? world").text()).toEqual(
              "hello world"
            );
            expect(doc.match2("hello{,2}?").text()).toEqual("");
            expect(doc.match2("hello{,1}?").text()).toEqual("");
          });

          it("match minimum and maximum", () => {
            expect(doc.match2("hello{1,2}?").text()).toEqual("hello");
            expect(doc.match2("hello{0,2}?").text()).toEqual("");
            expect(doc.match2("hello{0,1}?").text()).toEqual("");
            expect(doc.match2("hello{0,1}? world").text()).toEqual(
              "hello world"
            );
            expect(doc.match2("hello{0,2}? world").text()).toEqual(
              "hello hello world"
            );
          });

          it("skip zero range", () => {
            expect(doc.match2("hello{0}?").text()).toEqual("");
            expect(doc.match2("hello hello{0}?").text()).toEqual("hello");
            expect(doc.match2("hello{0}? world").text()).toEqual("world");
          });

          it("throws error on invalid range", () => {
            expect(() => doc.match2("hello{,}?")).toThrow(
              /Range min or max must be defined/
            );
            expect(() => doc.match2("hello{2,1}?")).toThrow(NLPRegexParseError);
            expect(() => doc.match2("hello{,-1}?")).toThrow(NLPRegexParseError);
          });
        });
      });

      describe("non greedy", () => {
        it("one or more", () => {
          expect(nlp("hello hello world").match2("hello+?").text()).toEqual(
            "hello"
          );
          expect(
            nlp("hello hello world").match2("hello+? world").text()
          ).toEqual("hello hello world");
        });

        it("zero or more", () => {
          expect(nlp("hello hello world").match2("hello*?").text()).toEqual("");
          expect(
            nlp("hello hello world").match2("hello*? world").text()
          ).toEqual("hello hello world");
        });

        it("zero or one", () => {
          expect(nlp("hello hello world").match2("hello??").text()).toEqual("");
          expect(
            nlp("hello hello world").match2("hello?? world").text()
          ).toEqual("hello world");
        });
      });
    });

    describe("groups", () => {
      describe("default group", () => {
        it("matches", () => {
          const match = nlp("hello world today").match2("hello (world)?");
          expect(match.text()).toEqual("hello world");
          expect(match.group(0).text()).toEqual("world");
          expect(Object.keys(match.groups())).toEqual(["0"]);
        });

        it("matches optional groups", () => {
          const match = nlp("hello").match2("hello (world)?");
          expect(match.text()).toEqual("hello");
          expect(match.group(0).text()).toBe("");
          expect(match.groups()).toEqual({});
        });

        it("matches groups with no matches", () => {
          const match = nlp("hello").match2("hello (world?)");
          expect(match.text()).toEqual("hello");
          expect(match.group(0).text()).toBe("");
          expect(Object.keys(match.groups())).toEqual(["0"]);
        });

        it("captures the group matches", () => {
          const match = doc.match2("(hello+) world");
          expect(match.text()).toEqual("hello hello world");
          expect(match.groups(0).text()).toEqual("hello hello");
          expect(Object.keys(match.groups())).toEqual(["0"]);
        });

        it("matches any pipe seperated value statements, OR operator", () => {
          const match = doc.match2("(world|hello)");
          expect(match.text()).toEqual("hello");
          expect(match.group(0).text()).toEqual("hello");
          expect(Object.keys(match.groups())).toEqual(["0"]);
        });

        it("only saves the last matched value for group", () => {
          const match = doc.match2("(world|hello)+");
          expect(match.text()).toEqual("hello hello world");
          expect(match.group(0).text()).toEqual("world");
          expect(Object.keys(match.groups())).toEqual(["0"]);
        });
      });

      describe("named capture groups", () => {
        it("matches and saves named group", () => {
          const text = nlp("hello world")
            .match2("(?P<what>hello)")
            .groups("what")
            .text();
          expect(text).toEqual("hello");
        });
      });

      describe("non-capturing group", () => {
        it("matches but does not save non-capturing group", () => {
          const match = doc.match2("hello (?:world)");
          expect(match.text()).toEqual("hello world");
          expect(match.groups()).toEqual({});
        });
      });

      describe("lookahead group", () => {
        it("asserts matches ahead and does not consume token", () => {
          const match = doc.match2("hello (?=world) .");
          expect(match.text()).toEqual("hello world");
          expect(match.groups()).toEqual({});
        });
      });

      describe("negative lookahead group", () => {
        it("asserts does not match ahead and does not consume token", () => {
          const match = doc.match2("hello (?!hello) .");
          expect(match.text()).toEqual("hello world");
          expect(match.groups()).toEqual({});
        });
      });
    });
  });
});
