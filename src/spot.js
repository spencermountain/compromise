//just a wrapper for text -> entities
//most of this logic is in ./parents/noun
var spot = (function() {

  if (typeof module !== "undefined" && module.exports) {
    pos = require("./pos");
  }

  var main = function(text, options) {
    options = options || {}
    var sentences = pos(text, options).sentences
    return sentences.reduce(function(arr, s) {
      return arr.concat(s.entities(options))
    }, [])
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()

// console.log(spot("Tony Hawk is cool").map(function(s){return s.normalised}))
// console.log(spot("My Hawk is cool").map(function(s){return s.normalised}))
