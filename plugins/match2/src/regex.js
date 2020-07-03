import { Lexer } from "chevrotain";
import { NLPMatchParser, allTokens } from "./parser";
import { pikevm } from "./pikevm";

export const NLPMatchLexer = new Lexer(allTokens);
export const parserInstance = new NLPMatchParser();

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
      this.prog = regex.prog;
      return;
    }

    const { tokens } = NLPMatchLexer.tokenize(regex);
    parserInstance.input = tokens;
    const { prog } = parserInstance.matchStatement();
    if (parserInstance.errors.length > 0) {
      throw new Error(
        `Sad sad panda, parsing errors detected!\n${parserInstance.errors[0].message}`
      );
    }
    this.regex = regex;
    this.prog = prog;
  }

  exec(docOrPhrase) {
    switch (docOrPhrase?.isA?.toLowerCase()) {
      case "doc":
        return this.execDoc(docOrPhrase);
      case "phrase":
        return this.execPhrase(docOrPhrase);
      default:
        return null; // may want to throw an error here
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
    const { found = false, saved = [], groups = {} } = pikevm(
      this.prog,
      phrase.terms()
    );
    const namedGroups = Object.values(groups).reduce(
      (arr, g) => ({
        ...arr,
        [parseInt(g.id)]: {
          group: g?.name ?? `${g.id}`,
          start: g.saved?.[0].id ?? 0,
          length: g.saved?.length ?? 0,
        },
      }),
      {}
    );
    return found && saved?.[0]?.id
      ? phrase.buildFrom(saved[0].id, saved.length, namedGroups)
      : null;
  }
}
