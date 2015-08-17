import Term = require("../term/term")

class Verb extends Term {
  constructor(text: string) {
    super(text);
    this.pos = "verb"
  }
  conjugate() {
    console.log(this.text);
    console.log(this.pos);
  }
}
export = Verb