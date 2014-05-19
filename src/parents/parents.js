if (typeof module !== "undefined" && module.exports) {
	Adjective = require("./adjective/index");
	Noun = require("./noun/index");
	Adverb = require("./adverb/index");
	Verb = require("./verb/index");
	Value = require("./value/index");
}
parents = {
	adjective: Adjective,
	noun: Noun,
	adverb: Adverb,
	verb: Verb,
	value: Value,
	glue: function() {}
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = parents;
}

// console.log(parents)