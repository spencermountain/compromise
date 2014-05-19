var Adverb = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_adjective = require("./conjugate/to_adjective")
	}

	var main = {

		conjugate: (function() {
			return {
				adjective: to_adjective(the.word)
			}
		})(),

	}
	return main;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Adverb;
}

// a = new Adverb("suddenly")
// console.log(a)
// console.log(adverbs.conjugate('powerfully'))