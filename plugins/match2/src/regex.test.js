import { NLPRegexP, NLPRegexParseError } from "./regex";

describe("NLPRegexP class", () => {
  describe("regex creation", () => {
    it("creates regex successfully", () => {
      const str =
        "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))";
      const regex = new NLPRegexP(str);
      expect(regex).toBeDefined();
      expect(regex.regex).toEqual(str);
      expect(regex.prog).toBeDefined();
      expect(regex.prog.length).toBeGreaterThan(0);
    });

    it("thows an error on invalid regex", () => {
      const str =
        "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+";
      expect(() => new NLPRegexP(str)).toThrow(NLPRegexParseError);
      try {
        new NLPRegexP(str);
      } catch (e) {
        expect(e.message).toBeDefined();
        expect(e.toString()).toMatch(/^NLP RegexP Parsing error: .*/);
      }
    });

    it("copies a regex if one already exists", () => {
      const str =
        "((remind|remember) (me|you|.) to? do? (?P<what>.+) (?P<when>#Date+))";
      const regexOrig = new NLPRegexP(str);
      const regex = new NLPRegexP(regexOrig);
      expect(regex).toBeDefined();
      expect(regex.regex).toEqual(str);
      expect(regex.regex).toEqual(regexOrig.regex);
      expect(regex.prog).toBeDefined();
      expect(regex.prog).toEqual(regexOrig.prog);
    });

    it("throws an error on invalid document type", () => {
      const regex = new NLPRegexP("hello world");
      expect(() => regex.exec("hello world")).toThrow(
        "Invalid type, must be Document or Phrase"
      );
    });
  });
});
