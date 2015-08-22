import getSyllables = require("./syllables")

let normalise = function (str) {
  if (!str) {
    return ""
  }
  str = str.toLowerCase();
  str = str.replace(/[,\.!:;\?\(\)]/, "");
  str = str.replace(/’/g, "'");
  str = str.replace(/"/g, "");
  // single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, "'");
  // double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
  if (!str.match(/[a-z0-9]/i)) {
    return "";
  }
  return str;
}

class Term {
  text: string;
  normalised: string;
  title_case: boolean;
  punctuated: boolean;
  pos: string;
  constructor(text: string) {
    this.text = text;
    this.normalised = normalise(text);
    this.title_case = (text.match(/^[A-Z][a-z]/) !== null); //use for merge-tokens
    this.punctuated = (text.match(/[,;:\(\)"]/) !== null) || undefined;
  }
  syllables(): string[] {
    return getSyllables(this.normalised)
    /*return ['asdf']*/
  }
}


export = Term;
