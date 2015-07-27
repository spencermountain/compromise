import Verb=require("./models/verb")
import Term=require("./models/term")
import Sentence=require("./models/sentence")


let he = new Term("he");
let talk = new Verb("walks");
talk.conjugate();
var s=new Sentence("he walks")
s.tag()
console.log(s.syllables())
console.log(Verb)