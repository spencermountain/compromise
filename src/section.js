//a block of text, with an arbitrary number of sentences
var Section = function(sentences) {
  var the = this
  the.sentences = sentences || [];

  the.text= function(){
    return the.sentences.map(function(s){
      return s.text()
    }).join(' ')
  }
  the.nouns= function(){
    return the.sentences.map(function(s){
      return s.nouns()
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }
  the.entities= function(options){
    return the.sentences.map(function(s){
      return s.entities(options)
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }
  the.adjectives= function(){
    return the.sentences.map(function(s){
      return s.adjectives()
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }
  the.verbs= function(){
    return the.sentences.map(function(s){
      return s.verbs()
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }
  the.adverbs= function(){
    return the.sentences.map(function(s){
      return s.adverbs()
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }
  the.values= function(){
    return the.sentences.map(function(s){
      return s.values()
    }).reduce(function(arr, a){return arr.concat(a)},[])
  }

}
if (typeof module !== "undefined" && module.exports) {
  module.exports = Section;
}