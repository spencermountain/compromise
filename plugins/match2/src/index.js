import { NLPRegexP } from "./regex";

export { NLPRegexP } from "./regex";

// nlp compromise plugin
export const Match2Plugin = (Doc, world, nlp, Phrase) => {
  const compileRegex = (regex) => new NLPRegexP(regex);
  nlp.compileRegex = compileRegex;
  Doc.prototype.compileRegex = compileRegex;

  const match2 = function (regex) {
    // function, non arrow, need bind for this which is doc/phrase
    regex = new NLPRegexP(regex); // coerce the value
    return regex.exec(this);
  };
  Doc.prototype.match2 = match2;
  Phrase.prototype.match2 = match2;
};
export default Match2Plugin;
