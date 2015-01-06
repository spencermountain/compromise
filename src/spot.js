//just a wrapper for text -> entities
//most of this logic is in ./parents/noun
var spot = (function() {

	if (typeof module !== "undefined" && module.exports) {
		pos = require("./pos");
	}

	var main = function(text, options) {
		options = options || {}
		var sentences = pos(text, options).sentences
		return sentences.reduce(function(arr,s){
			return arr.concat(s.entities(options))
		},[])
	}

	if (typeof module !== "undefined" && module.exports) {
		module.exports = main;
	}
	return main
})()

// pos = require("./pos");
// var spots = pos("Tony Hawk walked to Toronto. Germany is in Europe.").entities()
// var spots = spot("tony hawk walked to toronto. He is a singer in the band AFI.")
// var spots = spot("The third, which did happen, as a dissuasive Cold War, ended communism.")
// var spots = spot("mike myers and nancy kerrigan")
// console.log(spots.map(function(s){return s.normalised}))