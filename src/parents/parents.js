if (typeof module !== "undefined" && module.exports) {
	Adjective = require("./adjective/index");
	Noun = require("./noun/index");
	Adverb = require("./adverb/index");
	Verb = require("./verb/index");
	Value = require("./value/index");
}
var parents = {
	adjective: function(str, next, last) {
		return new Adjective(str, next, last)
	},
	noun: function(str, next, last) {
		return new Noun(str, next, last)
	},
	adverb: function(str, next, last) {
		return new Adverb(str, next, last)
	},
	verb: function(str, next, last) {
		return new Verb(str, next, last)
	},
	value: function(str, next, last) {
		return new Value(str, next, last)
	},
	glue: function(str, next, last) {
		return {}
	}
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = parents;
}

// console.log(parents)