if (typeof module !== "undefined" && module.exports) {
	Adjective = require("./adjective/index");
	Noun = require("./noun/index");
	Adverb = require("./adverb/index");
	Verb = require("./verb/index");
	Value = require("./value/index");
}
var parents = {
	adjective: Adjective,
	noun: function(str) {
		return new Noun(str)
	},
	adverb: function(str) {
		return new Adverb(str)
	},
	verb: function(str) {
		return new Verb(str)
	},
	value: function(str) {
		return new Value(str)
	},
	glue: function(str) {}
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = parents;
}

// console.log(parents)