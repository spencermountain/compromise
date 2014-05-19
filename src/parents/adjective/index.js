var Adjective = function(str) {
	var the = this
	the.word = str;

	if (typeof module !== "undefined" && module.exports) {
		to_comparative = require("./conjugate/to_comparative")
		to_superlative = require("./conjugate/to_superlative")
		adj_to_adv = require("./conjugate/to_adverb")
		adj_to_noun = require("./conjugate/to_noun")
	}

	the.conjugate = (function() {
		return {
			comparative: to_comparative(the.word),
			superlative: to_superlative(the.word),
			adverb: adj_to_adv(the.word),
			noun: adj_to_noun(the.word),
		}
	})()

	return the;
};
if (typeof module !== "undefined" && module.exports) {
	module.exports = Adjective;
}

// s = new Adjective("crazy")
// console.log(s)