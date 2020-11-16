import { Lexer } from "chevrotain";
import { NLPMatchParser, allTokens } from "./parser";
import { pikevm } from "./pikevm";

export const NLPMatchLexer = new Lexer(allTokens);
export const parserInstance = new NLPMatchParser();

export class NLPRegexParseError {
  constructor(errors) {
    this.errors = errors;
  }

  get message() {
    return this.errors[0]?.message;
  }

  toString() {
    return `NLP RegexP Parsing error: ${this.message}`;
  }
}

/**
 * Custom NLPRegexP class for regexp compile / cache.
 */
export class NLPRegexP {
  /**
   * @param {string} regex - regular expression like string for matching nlp
   * terms.
   */
  constructor(regex) {
    if (regex?.prog) {
      // take another NLPRegexP
      this.regex = regex.regex;
      this.prog = [...regex.prog];
      return;
    }

    const { tokens } = NLPMatchLexer.tokenize(regex);
    parserInstance.input = tokens;
    let parsed = null;

    try {
      parsed = parserInstance.matchStatement();
    } catch (e) {
      // catch thrown error
      throw new NLPRegexParseError([e]);
    }

    if (parserInstance.errors.length > 0) {
      throw new NLPRegexParseError(parserInstance.errors);
    }

    this.regex = regex;
    this.prog = parsed.prog;
  }

  exec(docOrPhrase) {
    switch (docOrPhrase?.isA?.toLowerCase()) {
      case "doc":
        return this.execDoc(docOrPhrase);
      case "phrase":
        return this.execPhrase(docOrPhrase);
      default:
        throw new Error("Invalid type, must be Document or Phrase");
    }
  }

  execDoc(doc) {
    return doc.buildFrom(
      doc.list
        .map((phrase) => {
          return this.execPhrase(phrase);
        })
        .filter((p) => p !== null)
    );
  }

  execPhrase(phrase) {
    const { found, saved = [], groups = {} } = pikevm(
      this.prog,
      phrase.terms()
    );

    const namedGroups = Object.values(groups).reduce(
      (arr, g) => ({
        ...arr,
        [parseInt(g.id)]: {
          group: g?.name ?? `${g.id}`,
          start: g.saved[0]?.id ?? 0,
          length: g.saved.length,
        },
      }),
      {}
    );

    return found && saved?.[0]?.id
      ? phrase.buildFrom(saved[0].id, saved.length, namedGroups)
      : null;
  }
}
