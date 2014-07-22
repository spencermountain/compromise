// "RB  - adverb (quickly, softly)",
// "RBR  - comparative adverb (faster, cooler)",
// "RBS  - superlative adverb (fastest (driving), coolest (looking))"
var Adverb = function(str, next, last, token) {
	var the = this
	the.word = str || '';
	the.next = next
	the.last = last

	if (typeof module !== "undefined" && module.exports) {
		to_adjective = require("./conjugate/to_adjective")
		parts_of_speech = require("../../data/parts_of_speech")
	}


	the.conjugate = function() {
		return {
			adjective: to_adjective(the.word)
		}
	}
	the.which = (function() {
		if (the.word.match(/..est$/)) {
			return parts_of_speech['RBS']
		}
		if (the.word.match(/..er$/)) {
			return parts_of_speech['RBR']
		}
		return parts_of_speech['RB']
	})()

	return the;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Adverb;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(a)
// console.log(adverbs.conjugate('powerfully'))