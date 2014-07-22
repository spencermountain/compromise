if (typeof module !== "undefined" && module.exports) {
	Adjective = require("./adjective/index");
	Noun = require("./noun/index");
	Adverb = require("./adverb/index");
	Verb = require("./verb/index");
	Value = require("./value/index");
}
var parents = {
	adjective: function(str, next, last, token) {
		return new Adjective(str, next, last, token)
	},
	noun: function(str, next, last, token) {
		return new Noun(str, next, last, token)
	},
	adverb: function(str, next, last, token) {
		return new Adverb(str, next, last, token)
	},
	verb: function(str, next, last, token) {
		return new Verb(str, next, last, token)
	},
	value: function(str, next, last, token) {
		return new Value(str, next, last, token)
	},
	glue: function(str, next, last, token) {
		return {}
	}
}
if (typeof module !== "undefined" && module.exports) {
	module.exports = parents;
}

// console.log(parents)