// "JJ  - adjective, generic (big, nice)",
// "JJR  - comparative adjective (bigger, cooler)",
// "JJS  - superlative adjective (biggest, fattest)"
var Adjective = function(str, next, last, token) {
	var the = this
	the.word = str || '';
	the.next = next
	the.last = last


	if (typeof module !== "undefined" && module.exports) {
		to_comparative = require("./conjugate/to_comparative")
		to_superlative = require("./conjugate/to_superlative")
		adj_to_adv = require("./conjugate/to_adverb")
		adj_to_noun = require("./conjugate/to_noun")
		parts_of_speech = require("../../data/parts_of_speech")
	}

	the.conjugate = function() {
		return {
			comparative: to_comparative(the.word),
			superlative: to_superlative(the.word),
			adverb: adj_to_adv(the.word),
			noun: adj_to_noun(the.word),
		}
	}

	the.which = (function() {
		if (the.word.match(/..est$/)) {
			return parts_of_speech['JJS']
		}
		if (the.word.match(/..er$/)) {
			return parts_of_speech['JJR']
		}
		return parts_of_speech['JJ']
	})()

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Adjective;
}

// console.log(new Adjective("crazy").conjugate())
// console.log(new Adjective("crazy"))
// console.log(new Adjective("craziest"))
// console.log(new Adjective("crazier"))