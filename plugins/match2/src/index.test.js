import NLP from "compromise";
import compromise_match2 from "./index";

describe("match2 plugin", () => {
  const nlp = NLP.clone().extend(compromise_match2);
  let doc = null;

  beforeEach(() => {
    doc = nlp("hello world");
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

  describe("regex matches", () => {
    it("successful match sets found", () => {
      expect(doc.match2("world").found).toBe(true);
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

      it('matches anywhere when not start of', () => {
        expect(nlp('hi there hello world this is a match').match2('world').text()).toEqual('world');
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
    });
  });
});
