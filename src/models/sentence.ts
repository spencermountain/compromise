import Verb=require("./verb")
import Term=require("./term")


class Sentence {
    text:string;
    terms:Term[];
    constructor(text: string) {
      this.text=text
      this.terms=text.split(" ").map(function(t){
        return new Term(t)
      })
    }
    tag(){
      this.terms=this.terms.map(function(t){
        return new Verb(t.text)
      })
    }
    syllables() :string[]{
      return ["a","Y"]
    }
  }

export= Sentence